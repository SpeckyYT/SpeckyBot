const { RichEmbed } = require('discord.js')

module.exports = async (bot, msg) => {
    if(msg.author.bot || msg.channel.type === "dm") return;

    if(msg.system) return;

    if(!msg.content.toLowerCase().startsWith(bot.config.prefix)){
        if(msg.mentions.users.first()) {
            if(msg.mentions.users.first().tag == bot.user.tag){
                let clean = `@${msg.guild.me.nickname ? msg.guild.me.nickname : bot.user.username}`;
                if(msg.cleanContent != clean){
                    msg.content = msg.cleanContent.replace(clean, bot.config.prefix).trim();
                }else{
                    msg.args = [];
                    msg.Args = [];
                    let help = "help";
                    logger(help,true,msg,bot);
                    let helpcmd = bot.commands.get(help);
                    run(helpcmd, bot, msg, `${bot.config.prefix}${help}`);
                }
            }
        }
    }

    if(!msg.content.toLowerCase().startsWith(bot.config.prefix)) return;
    
    msg.Args = msg.content.split(/\s|\n/g);

    let command = msg.Args[0].toLowerCase();

    while(msg.Args[0] == bot.config.prefix){
        let fix = msg.Args[0] + msg.Args[1];
        msg.Args[1] = fix;
        command = fix.toLowerCase();
        msg.Args = msg.Args.slice(1);
    }
    msg.Args = msg.Args.slice(1);

    msg.command = command.slice(bot.config.prefix.length);

    msg.args = msg.Args.join(' ').toLowerCase().split(' ');

    if(command == `${bot.config.prefix}undefined`) return;

    let cmd = bot.commands.get(command.slice(bot.config.prefix.length)) || bot.commands.get(bot.aliases.get(command.slice(bot.config.prefix.length)));
    
    if(cmd){
        bot.stats.commandsExecuted++;

        logger(command.slice(bot.config.prefix.length),true,msg,bot);

        if(msg.guild.me.permissionsIn(msg.channel).toArray().indexOf('SEND_MESSAGES') < 0){
            return;
        }

        let owner = false;
        let admin = false;
        let illegal = false;

        if(bot.checkOwner(msg.author.id)){owner = true}
        if(msg.channel.permissionsFor(msg.member).has("ADMINISTRATOR")){admin = true}

        let errorReasons = [];

        function check(adminAllowed, reason){
            if(owner){
                illegal = true;
                errorReasons.push(reason.toString());
                return false;
            }else if(   false &&                     //Disabled from tip of the Discord Bots community
                        adminAllowed &&
                        admin &&
                        (category != "owner" &&
                        category != "private" &&
                        category != "custom")
            ){
                illegal = true;
                errorReasons.push(reason);
                return false;
            }else{
                return true;
            }
        }

        let ownerError    =  "👮‍♂️ You aren't the bot owner.";
        let botPermError  =  "🚫 Bot doesn't have required permissions.";
        let nsfwError     =  "🔞 This command is only allowed in a NSFW channel.";
        let imagesError   =  "🎨 This command requires the \`ATTACH FILES\` permission.";
        let userPermError =  "🚷 You don't have the required permissions for that command.";
        let serverError   =  "⛔ This command isn't available on this server.";

        let category = cmd.config.category;

        if(category == "images"){
            await bot.setLastImageCache(msg);
        }

        if((category == "owner" || cmd.config.category === "private") && !owner){
            return msg.channel.send(error(ownerError))
        }

        if(cmd.config.cmdperms){
            cmd.config.cmdperms.forEach(perm => {
                if(!msg.guild.me.hasPermission(perm)){
                    if(check(false, botPermError)){
                        return msg.channel.send(error(`${botPermError}\nMissing permission: \`${perm}\``))
                    }
                }
            })
        }
        
        if(category == "nsfw" && !msg.channel.nsfw){
            if(check(true, nsfwError)){
                return msg.channel.send(error(nsfwError))
            }
        }

        if(category == "images" && !msg.channel.permissionsFor(msg.guild.me).has('ATTACH_FILES')){
            if(check(false, imagesError)){
                return msg.channel.send(error(imagesError))
            }
        }

        if(!(msg.member.hasPermission(["ADMINISTRATOR"]))){ 
            if(cmd.config.perms){
                if(!msg.member.hasPermission(cmd.config.perms)){
                    if(check(false, userPermError)){
                        return msg.channel.send(error(userPermError))
                    }
                }
            }
        }

        if(cmd.config.servers){
            if(cmd.config.servers.indexOf(msg.guild.id.toString()) < 0){
                if(check(false, serverError)){
                    return msg.channel.send(error(serverError));
                }
            }
        }

        if(illegal){
            let time = 10;
            msg.channel.send(error(`⚠️ You are doing something that you shouldn't!\n\nReason${errorReasons.length == 1 ? '' : 's'}:\n${errorReasons.join("\n")}\n\nThis message and yours with autodestruct in ${time} seconds if you don't confirm.`))
            .then(ms => {
                let emote = '✅';
                ms.react(emote);
                const filter = (reaction, user) => user.id === msg.author.id && reaction.emoji.name === emote
                ms.awaitReactions(filter, { max: 1, time: (time*1000), errors: ['time']})
                .then(() => {
                    try{ms.delete()}catch{}
                    run(cmd, bot, msg, command);
                })
                .catch(() => {
                    try{msg.delete()}catch{}
                    try{ms.delete()}catch{}
                })
            })
        }else{
            run(cmd, bot, msg, command)
        }

    }else{
        logger(command.slice(bot.config.prefix.length),false,msg, bot);
        await msg.channel.send(error(`🛑 Command \`${command}\` doesn't exist or isn't loaded correctly.`));
    }
}

async function run(cmd, bot, msg, command){
    try{
        await cmd.run(bot, msg);
    }catch(err){

        let expected;
        try{
            expected = err.includes("[EXPECTED]")
        }catch(e){expected = false}

        if(expected){
            err = err.replace("[EXPECTED]","").trim();
            await msg.channel.send(error(err));
        }else{
            bot.log(err);
            await msg.channel.send(error(`🚸 An unexpected error happend at \`${command}\` command.\nIf this error happens frequently, report it to the SpeckyBot creators.`));
            if(err.length < 1950){
                await msg.channel.send(errdesc(err));
            }else{
                await msg.channel.send(errdesc(err.message));
            }
        }
    }
}

function logger(cmd, actived, msg, bot){
    bot.log(`${cmd.toUpperCase()}: (${actived?"activated":"rejected"}) ${msg.author.tag} (${msg.author.id}, ${msg.channel.id}, ${msg.guild.id})`)
}

function error(error){
    return new RichEmbed()
    .setTitle('ERROR!')
    .setDescription(error)
    .setColor('FF0000')
}

function errdesc(err){
    return new RichEmbed()
    .setTitle('ERROR DESCRIPTION')
    .setDescription(err)
    .setColor('FF0000')
}

module.exports.config = {
    event: "message"
}
