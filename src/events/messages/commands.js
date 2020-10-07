module.exports = {
    event: "message"
}

const { MessageEmbed, Collection } = require('discord.js');
const leven = require('leven');
const fetch = require('node-fetch');
const promisify = require('promisify-func');

module.exports.call = async (bot, m) => {
    const msg = m.extend().cmdExtend();

    if(msg.author.bot) return;

    if(msg.system) return;

    if(bot.cache.messages.includes(msg.id)){
        return;
    }else{
        bot.cache.messages.push(msg.id);
    }

    if(bot.config.bannedUsers.includes(msg.author.id)){
        return;
    }

    if(msg.channel.topicSetting && msg.channel.topicSetting("global")){
        return;
    }

    if(!msg.content.toLowerCase().startsWith(bot.config.prefix)){
        if(msg.mentions.users.first() ? msg.mentions.users.first().tag == bot.user.tag : false){
            const clean = `@${msg.guild.me.nickname || bot.user.username}`;
            if(msg.cleanContent != clean){
                msg.content = msg.cleanContent.replace(clean, bot.config.prefix).trim();
            }else{
                msg.content = bot.config.prefix
            }
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
            msg.cmdContent = await (await fetch(msg.attachments.filter(v => v.filename.endsWith('.txt')).first().url)).text();
        }catch(e){}
    }

    let cmd = bot.getCommand(msg.command || 'help');

    const execute = async () => {
        if(cmd){
            bot.stats.commandsExecuted++;
            bot.cache.msg = msg;

            logger(msg.command,true,msg,bot);

            if(msg.channel.type != "dm" && !msg.guild.me.permissionsIn(msg.channel).has('SEND_MESSAGES')){
                return
            }

            let owner = false;
            let admin = false;
            let illegal = false;

            if(msg.author.id.isOwner()){
                owner = true
            }
            if(msg.channel.type != "dm" && msg.channel.permissionsFor(msg.member).has("ADMINISTRATOR")){
                admin = true
            }

            const errorReasons = [];

            function check(adminAllowed, reason){
                if(owner){
                    illegal = true;
                    errorReasons.push(reason.toString());
                    return false;
                }else if(
                    adminAllowed &&
                    admin &&
                    category != "owner" &&
                    category != "private" &&
                    category != "custom"
                ){
                    illegal = true;
                    errorReasons.push(reason);
                    return false;
                }else{
                    return true;
                }
            }

            const ownerError    =  "👮‍♂️ You aren't the bot owner.";
            const botPermError  =  "🚫 Bot doesn't have required permissions.";
            const nsfwError     =  "🔞 This command is only allowed in NSFW channels.";
            const imagesError   =  "🎨 This command requires the `ATTACH FILES` permission.";
            const userPermError =  "🚷 You don't have the required permissions for that command.";
            const serverError   =  "⛔ This command isn't available on this server.";
            const musicError1   =  "🎵 You have to be in a vocal channel to perform this command.";
            const musicError2   =  `🎵 You have to be in the same vocal channel of ${bot.user} to run this command.`
            const officialError =  "🤖 This is the official SpeckyBot."

            const category = cmd.category;

            if(category == "images"){
                await bot.setLastImageCache(msg);
            }

            if(category == "economy"){
                await bot.economyRead(msg);
            }

            if(category == "owner" || cmd.category === "private"){
                if(owner && bot.user.id == '398157933315227649'){
                    errorReasons.push(officialError);
                    illegal = true;
                }else if(!owner){
                    return msg.channel.send(error(ownerError));
                }
            }

            if(cmd.cmdperms){
                cmd.cmdperms.forEach(perm => {
                    if(!(msg.guild ? msg.guild.me.hasPermission(perm) : true)){
                        if(check(false, botPermError)){
                            return msg.channel.send(error(`${botPermError}\nMissing permission: \`${perm}\``))
                        }
                    }
                })
            }

            if(category == "nsfw" && (!msg.channel.nsfw || msg.channel.topicSetting('no-nsfw'))){
                if(check(false, nsfwError)){
                    return msg.channel.send(error(nsfwError))
                }
            }

            if(category == "images" && (msg.guild ? !msg.channel.permissionsFor(msg.guild.me).has('ATTACH_FILES') : false)){
                if(check(false, imagesError)){
                    return msg.channel.send(error(imagesError))
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

            }

            if(msg.channel.type != "dm" && !(msg.member.hasPermission(["ADMINISTRATOR"]))){
                if(cmd.perms){
                    if(!msg.member.hasPermission(cmd.perms)){
                        if(check(false, userPermError)){
                            return msg.channel.send(error(userPermError))
                        }
                    }
                }
            }

            if(cmd.servers){
                if(cmd.servers.indexOf(msg.guild.id.toString()) < 0){
                    if(check(false, serverError)){
                        return msg.channel.send(error(serverError));
                    }
                }
            }

            if(illegal){
                const time = 10;
                msg.channel.send(error(`⚠️ You are doing something that you shouldn't!\n\n${"Reason".singPlur(errorReasons.length,false)}:\n${errorReasons.join("\n")}\n\nThis message and yours with autodestruct in ${time} seconds if you don't confirm.`))
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
            }else{
                await run(cmd, bot, msg, msg.command);
            }

        }else{
            logger(msg.command,false,msg, bot);

            if(bot.config.reply_unexisting_command){
                await msg.channel.send(error(`🛑 Command \`${msg.command || "null"}\` doesn't exist or isn't loaded correctly.`));
            }
        }
    }

    if(cmd){
        return execute();
    }else{
        const cmdarray = bot.commands
        .map(c => c.name)
        .concat(bot.aliases.keyArray())
        .filter(c => categoryCheck((bot.getCommand(c)||{}).category, msg));
        let mostlikely = new Collection();
        cmdarray.forEach(item => {
            const numb = leven(msg.command,item);
            mostlikely.set(item,numb);
        })
        mostlikely = mostlikely.sort((a,b) => a-b);
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
            if(isNaN(numb)){
                return collector.stop();
            }
            await ms.delete().catch(()=>{});
            runned = true;
            const com = items[numb-1];
            msg.command = com;
            cmd = bot.commands.get(com) || bot.commands.get(bot.aliases.get(com));
            collector.stop();
            return execute();
        });
        collector.on('end', async () => {
            if(runned) return;
            await ms.edit(error(`🛑 Command \`${msg.command}\` doesn't exist or isn't loaded correctly.`)).catch(()=>{});
        });
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
        if(cmd.type === 'template' && res && typeof res == "string"){
            return msg.channel.send(res.trim());
        }
        return res
    })
    .then((ret) => {
        let suc;
        try{
            suc = ret.includes("[SUCCESS]")
        }catch(e){
            suc = false
        }

        if(suc){
            ret = ret.replace("[SUCCESS]","").trim();
            msg.channel.send(success(ret));
        }
    })
    .catch(async (err) => {
        let expected;
        try{
            expected = err.includes("[EXPECTED]")
        }catch(e){
            expected = false
        }

        if(expected){
            err = err.replace("[EXPECTED]","").trim();
            msg.channel.send(error(err));
        }else{
            bot.log(err&&(err.message||err.error)||err);
            await msg.channel.send(error(`🚸 An unexpected error happend at \`${command}\` command.\nIf this error happens frequently, report it to the SpeckyBot creators.`));

            if(String(err).includes("Must be 2000 or fewer in length")){
                return msg.channel.send(
                    errdesc(`${bot.user} tried to send a message with 2000 or more characters.`)
                );
            }

            if(String(err).includes("Request entity too large")){
                return msg.channel.send(
                    errdesc(`${bot.user} tried to send an attachment with more than 8MB.`)
                );
            }

            if(String(err).includes("Not playing")){
                return msg.channel.send(
                    errdesc(`${bot.user} is not playing music in this guild, do \`${bot.config.prefix}play <song>\` to play one.`)
                );
            }

            if(msg.channel.type == "dm"){
                return msg.channel.send(
                    errdesc(`${bot.user} tried to execute this command, but encountered an error (probably because it's in a DM)`)
                );
            }

            return msg.channel.send(errdesc(err));
        }
    })
    .finally(async () => {
        bot.cache.runningcmds = bot.cache.runningcmds.remove(`${msg.channel.id}:${cmd.name}`);
        if(cmd.category == "economy"){
            await bot.economyWrite(bot.economy);
        }
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

function errdesc(err){
    try{
        err = err.stack ? err.stack.substr(0,1950) : err.substr(0,1950);
    }catch(e){
        err = null;
    }
    return new MessageEmbed()
    .setTitle('ERROR DESCRIPTION')
    .setDescription(String(err))
    .setColor('FF0000')
}

function success(suc){
    return new MessageEmbed()
    .setTitle('SUCCESS!')
    .setDescription(suc)
    .setColor('00FF00')
}

function categoryCheck(category,msg){
    if(typeof category != "string") return true;
    category = category.toLowerCase();
    switch(category){
        case "owner":
            return msg.author.id.isOwner();
        case "admin":
            return msg.member.permissions.toArray().join(' ').includes('MANAGE_');
        case "nsfw":
            return !msg.channel.topicSetting('no-nsfw') && msg.channel.nsfw;
        default:
            return true;
    }
}
