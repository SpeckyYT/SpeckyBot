const { RichEmbed } = require('discord.js')

module.exports = async (bot, msg) => {
    if(msg.author.bot || msg.channel.type === "dm") return;

    if(!msg.content.toLowerCase().startsWith(bot.config.prefix)){
        if(msg.mentions.users.first()) {
            if(msg.mentions.users.first().tag == bot.user.tag){
                let clean = `@${msg.guild.me.nickname ? msg.guild.me.nickname : bot.user.username}`;
                if(msg.cleanContent != clean){
                    msg.content = msg.cleanContent.replace(clean, bot.config.prefix).trim();
                }else{
                    msg.args = [];
                    msg.Args = [];
                    logger("help",true,msg);
                    let helpcmd = bot.commands.get("help");
                    run(helpcmd, bot, msg, `${bot.config.prefix}help`);
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

    msg.args = msg.Args.join(' ').toLowerCase().split(' ');

    if(command == `${bot.config.prefix}undefined`) return;

    let cmd = bot.commands.get(command.slice(bot.config.prefix.length)) || bot.commands.get(bot.aliases.get(command.slice(bot.config.prefix.length)));
    
    if(cmd){
        await msg.channel.startTyping()
        bot.stats.commandsExecuted++;
        logger(command.slice(bot.config.prefix.length),true,msg);
        if(msg.guild.me.permissionsIn(msg.channel).toArray().indexOf('SEND_MESSAGES') < 0){
            return;
        }

        let owner = false;
        let admin = false;
        let illegal = false;

        if(msg.author.id == bot.config.owner){owner = true}
        if(msg.channel.permissionsFor(msg.member).has("ADMINISTRATOR")){admin = true}

        function check(adminAllowed){
            if(owner){
                illegal = true;
                return false;
            }else if(adminAllowed && admin && (category != "owner" && category != "private" && category != "custom")){
                illegal = true;
                return false;
            }else{
                return true;
            }
        }

        let category = cmd.config.category;

        if((category == "owner" || cmd.config.category === "private") && !owner){
            return msg.channel.send(error(`👮‍♂️ You aren't the bot owner.`))
        }

        if(cmd.config.cmdperms){
            cmd.config.cmdperms.forEach(perm => {
                if(!msg.guild.me.hasPermission(perm)){
                    if(check(false)){
                        return msg.channel.send(error(`🚫 Bot doesn't have required permissions.\n\`${perm}\``))
                    }
                }
            })
        }
        
        if(category == "nsfw" && !msg.channel.nsfw){
            if(check(true)){
                return msg.channel.send(error(`🔞 This command is only allowed in a NSFW channel.`))
            }
        }

        if(category == "images" && !msg.channel.permissionsFor(msg.guild.me).has('ATTACH_FILES')){
            if(check(false)){
                return msg.channel.send(error(`🎨 This command requires the \`ATTACH FILES\` permission.`))
            }
        }

        if(!(msg.member.hasPermission(["ADMINISTRATOR"]))){ 
            if(cmd.config.perms){
                if(!msg.member.hasPermission(cmd.config.perms)){
                    if(check(false)){
                        return msg.channel.send(error(`🚷 You don't have the required permissions for that command.`))
                    }
                }
            }
        }

        if(cmd.config.servers){
            if(cmd.config.servers.indexOf(msg.guild.id.toString()) < 0){
                if(check(false)){
                    return msg.channel.send(error(`⛔ This command isn't available on this server.`));
                }
            }
        }

        if(illegal){
            let time = 10;
            msg.channel.send(error(`⚠️ You are doing something that you shouldn't!\nThis message and yours with autodestruct in ${time} seconds if you don't confirm.`))
            .then(ms => {
                let emote = '✅';
                ms.react(emote);
                const filter = (reaction, user) => user.id === msg.author.id && reaction.emoji.name === emote
                ms.awaitReactions(filter, { max: 1, time: (time*1000), errors: ['time']})
                .then(collected => {
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
        logger(command.slice(bot.config.prefix.length),false,msg);
        await msg.channel.send(error(`🛑 Command \`${command}\` doesn't exist or isn't loaded correctly.`));
        await msg.channel.stopTyping(true)
    }
}

async function run(cmd, bot, msg, command){
    try{
        await cmd.run(bot, msg);
    }catch(err){
        console.error(err);
        await msg.channel.send(error(`🚸 An unexpected error happend at \`${command}\` command.\nIf this error happens frequently, report it to the SpeckyBot creators.`));
        if(err.length < 1950){
            await msg.channel.send(errdesc(err));
        }else{
            await msg.channel.send(errdesc(err.message));
        }
    }
    await msg.channel.stopTyping(true)
}

function logger(cmd, actived, msg){
    console.log(`${cmd.toUpperCase()}: (${actived?"activated":"rejected"}) ${msg.author.tag} (${msg.author.id}, ${msg.channel.id}, ${msg.guild.id})`)
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
