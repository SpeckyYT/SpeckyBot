module.exports = {
    event: "cleanMessage"
}

const { MessageEmbed, Collection, Permissions } = require('discord.js');
const { compareTwoStrings } = require('string-similarity');
const fetch = require('node-fetch');
const promisify = require('promisify-func');
const qdb = require('quick.db');
const usersettings = new qdb.table('usersettings');

const deleteTime = 2**31-1;

module.exports.call = async (bot, m) => {
    const msg = m.extend().cmdExtend();

    if(!msg.content.toLowerCase().startsWith(bot.config.prefix)){
        if(msg.mentions.users.first() ? msg.mentions.users.first().id == bot.user.id : false){
            msg.content = msg.content.replace(new RegExp(`<@!?${bot.user.id}>`),bot.config.prefix);
        }
    }

    if(!msg.content.toLowerCase().startsWith(bot.config.prefix)) return;

    msg.command = msg.content.trim().slice(bot.config.prefix.length).trim().split(/[\s\n]/g)[0].toLowerCase();

    msg.cmdContent = msg.content
    .replace(/(\s*--\w+\s*)+/g,' ').trim()
    .slice(bot.config.prefix.length).trimLeft()
    .slice(msg.command.length).trimLeft();

    if(!msg.cmdContent && msg.attachments.size){
        try{
            const att = msg.attachments.filter(v => v.name.endsWith('.txt')).first().url;
            const file = await fetch(att).then(r => r.text());
            msg.cmdContent = file;
        }catch(e){}
    }

    let cmd = bot.getCommand(msg.command || 'help');

    const execute = async () => {
        bot.stats.commandsExecuted++;

        logger(msg.command,true,msg,bot);

        if(msg.channel.permissionsFor){
            const botperms = msg.channel.permissionsFor(bot.user);

            if(!botperms.has('SEND_MESSAGES'))
                return msg.author.send(
                    bot.embed()
                    .setTitle('Missing permissions')
                    .setDescription(
                        "SpeckyBot doesn't have the permissions to type in that channel.\n" +
                            "You can retry in another channel or directly here in DM."
                    )
                ).catch(()=>{});

            if(!botperms.has(bot.perms.commands))
                return msg.channel.send(
                    "Required permissions for commands:".code('yaml') +
                        "\n" +
                        [
                            ['ATTACH_FILES','Images'],
                            ['EMBED_LINKS','Embeds'],
                        ].map(([perm,name]) =>
                            `[${botperms.has(perm) ? "X" : " "}] ${name}`
                        ).join('\n').code('ini')
                ).catch(()=>{});
        }

        const owner = msg.author.id.isOwner();
        let illegal = false;

        const errorReasons = [];

        function check(reason){
            errorReasons.push(reason.toString());
            return !(illegal = owner);
        }

        const ownerError    =  "👮‍♂️ You aren't the bot owner.";
        const botPermError  =  "🚫 Bot doesn't have required permissions.";
        const nsfwError     =  "🔞 This command is only allowed in NSFW channels.";
        const userPermError =  "🚷 You don't have the required permissions for that command.";
        const serverError   =  "⛔ This command isn't available on this server.";
        const channelError  =  "⛔ This command isn't available in this channel.";
        const userError     =  "⛔ This command isn't available for you.";
        const musicError1   =  "🎵 You have to be in a vocal channel to perform this command.";
        const musicError2   =  `🎵 You have to be in the same vocal channel of ${bot.user} to run this command.`
        const musicError3   =  "🎵 Missing playing permissions in the vocal channel.\n\n"
        const officialError =  "🤖 This is the official SpeckyBot."

        const category = cmd.category;

        if(category == "images") await bot.setLastImageCache(msg);
        if(category == "economy") bot.economySummon(msg.author);

        if(category == "owner" || cmd.category === "private"){
            if(owner && bot.user.id == '398157933315227649'){
                errorReasons.push(officialError);
                illegal = true;
            }else if(!owner){
                return msg.channel.send(error(ownerError));
            }
        }

        if(category == "nsfw" && !msg.channel.isNSFW()){
            if(check(nsfwError)){
                return msg.channel.send(error(nsfwError))
            }
        }

        if(category == "music"){
            if(!(msg.member.voice && msg.member.voice.channel)){
                return msg.channel.send(error(musicError1))
            }
            if(msg.guild.me.voice && msg.guild.me.voice.channel){
                if(msg.member.voice.channel.id != msg.guild.me.voice.channel.id){
                    return msg.channel.send(error(musicError2))
                }
            }
            if(!bot.music.isPlaying(msg.guild.id)){
                const perms = ['CONNECT','SPEAK']
                .map(perm => msg.member.voice.channel.permissionsFor(bot.user.id).has(perm));
                if(perms.some(v => !v)){
                    return msg.channel.send(
                        musicError3 +
                        ['CONNECT','SPEAK']
                        .filter((v,i) => !perms[i]).join('\n')
                        .code('')
                    )
                }
            }
        }

        if(cmd.botPerms){
            const perms = msg.guild ? msg.channel.permissionsFor(bot.user) : Permissions.DEFAULT;
            if(!perms.has(cmd.botPerms) && check(botPermError))
                return msg.channel.send(
                    error(
                        `${botPermError}\n\n` +
                            `Missing permissions:\n` +
                            new Permissions(cmd.botPerms)
                            .remove(perms).toArray().join('\n').code('')
                    )
                )
        }

        if(cmd.userPerms){
            const perms = msg.guild ? msg.channel.permissionsFor(msg.author) : Permissions.DEFAULT;
            if(!perms.has(cmd.userPerms) && check(userPermError))
                return msg.channel.send(
                    error(
                        `${userPermError}\n\n` +
                            `Missing permissions:\n` +
                            new Permissions(cmd.userPerms)
                            .remove(perms).toArray().join('\n').code('')
                    )
                )
        }

        if(cmd.limited){
            const { user, channel, guild } = cmd.limited;

            if(guild){
                const guilds = Array.isArray(guild) ? guild : [guild];
                if(!msg.guild || (!guilds.includes(msg.guild.id) && check(serverError)))
                    return msg.channel.send(error(serverError));
            }
            if(channel){
                const channels = Array.isArray(channel) ? channel : [channel];
                if(!msg.guild || (!channels.includes(msg.channel.id) && check(channelError)))
                    return msg.channel.send(error(channelError));
            }
            if(user){
                const users = Array.isArray(user) ? user : [user];
                if(!users.includes(msg.author.id) && check(userError))
                    return msg.channel.send(error(userError));
            }
        }

        if(illegal){
            const time = 10;
            return msg.channel.send(error(`⚠️ You are doing something that you shouldn't!\n\n${"Reason".singPlur(errorReasons.length,false)}:\n${errorReasons.join("\n")}\n\nThis message and yours with autodestruct in ${time} seconds if you don't confirm.`))
            .then(async ms => {
                const emote = '✅';
                await ms.react(emote);
                const filter = (reaction, user) => (user.id == msg.author.id) && (reaction.emoji.name == emote)
                const collector =  ms.createReactionCollector(filter, { time: (time*1000), errors: ['time'] })

                let runned = false;

                collector.on('collect', async () => {
                    runned = true;
                    collector.stop();
                    await ms.delete().catch(()=>{});
                    return run(cmd, bot, msg, msg.command);
                })

                collector.on('end', async () => {
                    if(runned) return;
                    await ms.delete().catch(()=>{});
                    await msg.delete().catch(()=>{});
                })
            })
        }

        return run(cmd, bot, msg, msg.command);
    }

    if(cmd){
        return execute();
    }else{
        if(!usersettings.get(`${msg.author.id}.invalidcommand`)) return;
        const cmdarray = bot.commands
        .map(c => c.name)
        .concat(bot.aliases.keyArray())
        .filter(c => bot.checkCategory((bot.getCommand(c)||{}).category, msg));
        let mostlikely = new Collection();
        cmdarray.forEach(item => mostlikely.set(item,compareTwoStrings(msg.command,item)))
        mostlikely = mostlikely.sort((a,b) => b-a);
        const items = mostlikely.keyArray().slice(0,9);
        let string = `Command \`${msg.command}\` is unavailable...\nSend a message with the number of the desidered command or \`c\` to cancel.\n\n`;
        items.forEach((val, ind) => string += `\`${ind+1}\` ${val}\n`)
        const ms = await msg.channel.send(bot.embed().setDescription(string));
        const regex = /^[1-9c]$/g
        const filter = m => ((m.author.id == msg.author.id) && Boolean(m.content.toLowerCase().match(regex)));
        const collector = msg.channel.createMessageCollector(filter, { time: 15000, errors: ["time"] });
        let runned = false;
        collector.on('collect', async (collected) => {
            const m = collected;
            const numb = m.content.toLowerCase().match(regex)[0];
            await m.delete().catch(()=>{});
            if(isNaN(numb)) return collector.stop();
            await ms.delete().catch(()=>{});
            runned = true;
            const com = items[numb-1];
            msg.command = com;
            cmd = bot.getCommand(com);
            collector.stop();
            return execute();
        });
        collector.on('end', () =>
            runned && ms.edit(
                error(`🛑 Command \`${msg.command}\` doesn't exist or isn't loaded correctly.`)
            ).catch(()=>{})
        );
    }
}

async function run(cmd, bot, msg, command){
    if(bot.cache.runningcmds.includes(`${msg.channel.id}:${cmd.name}`)){
        return msg.channel.send(error("This command is already running..."));
    }

    const cd = bot.cache.cooldown.get(`${msg.author.id}:${cmd.name}`);
    if(cd){
        const diff = new Date().getTime() - cd.getTime();
        if(diff < (cmd.cooldown ? cmd.cooldown : 1000)){
            return msg.channel.send(error("This command is on cooldown..."));
        }
    }

    bot.cache.cooldown.set(`${msg.author.id}:${cmd.name}`, new Date());
    bot.cache.runningcmds.push(`${msg.channel.id}:${cmd.name}`);

    promisify(bot.getFunction(cmd))(bot,msg)
    .then(res => {
        if(res && cmd.type == 'send'){
            return msg.channel.send(res);
        }
        return res;
    })
    .then((ret) => {
        let suc = String(ret).includes("[SUCCESS]");

        if(suc){
            ret = ret.replace("[SUCCESS]","").trim();
            msg.channel.send(success(ret))
            .then(m => bot.wait(deleteTime,m))
            .then(m => m.delete())
            .catch(()=>{});
        }
    })
    .catch(async (err) => {
        let expected = String(err).includes("[EXPECTED]");

        if(expected){
            err = err.replace("[EXPECTED]","").trim();
            msg.channel.send(error(err))
            .then(m => bot.wait(deleteTime,m))
            .then(m => m.delete())
            .catch(()=>{});
        }else{
            // await msg.channel.send(error(`🚸 An unexpected error happend at \`${command}\` command.\nIf this error happens frequently, report it to the SpeckyBot creators.`));

            if(String(err).includes("Must be 2000 or fewer in length")){
                return msg.channel.send(
                    errdesc(`${bot.user} tried to send a message with 2000 or more characters.`,command)
                );
            }

            if(String(err).includes("Request entity too large")){
                return msg.channel.send(
                    errdesc(`${bot.user} tried to send an attachment that is too big.`,command)
                );
            }

            if(String(err).includes("Not playing")){
                return msg.channel.send(
                    errdesc(`${bot.user} is not playing music in this guild, do \`${bot.config.prefix}play <song>\` to play one.`,command)
                );
            }

            if(msg.channel.type == "dm"){
                return msg.channel.send(
                    errdesc(`${bot.user} tried to execute this command, but encountered an error (probably because it's in a DM)`,command)
                );
            }

            bot.emit('commandError',err,msg);

            return msg.channel.send(errdesc(err,command));
        }
    })
    .finally(async () => {
        bot.cache.runningcmds = bot.cache.runningcmds.remove(`${msg.channel.id}:${cmd.name}`);
    })
}

function logger(cmd, actived, msg, bot){
    bot.log(`${cmd.toUpperCase()}: (${actived?"activated":"rejected"}) ${msg.author.tag} (${msg.author.id}, ${(msg.channel || {}).id}, ${(msg.guild || {}).id})`.cmd)
}

function error(error){
    return new MessageEmbed()
    .setTitle('ERROR!')
    .setDescription(error.substr(0,1950))
    .setColor('FF0000')
}

function errdesc(err,cmd){
    err = String(err).split('\n').slice(0,5).join('\n');
    return new MessageEmbed()
    .setTitle('ERROR!')
    .setDescription(`🚸 An unexpected error happend at \`${cmd}\` command.\nIf this error happens frequently, report it to the SpeckyBot creators.\n\n`+String(err))
    .setColor('FF0000')
}

function success(suc){
    return new MessageEmbed()
    .setTitle('SUCCESS!')
    .setDescription(suc)
    .setColor('00FF00')
}
