const { RichEmbed } = require('discord.js')

module.exports = async (bot, msg) => {
    const config = require('../../config.json')

    if (!msg.content.toLowerCase().startsWith(config.prefix) || msg.author.bot || msg.channel.type === "dm") return;
    
    msg.args = msg.content.split(/\s|\n/g);

    let command = msg.args[0].toLowerCase();

    while(msg.args[0] == config.prefix){
        let fix = msg.args[0] + msg.args[1];
        msg.args[1] = fix;
        command = fix.toLowerCase();
        msg.args = msg.args.slice(1);
    }
    msg.args = msg.args.slice(1);

    let args = msg.args.join(' ').toLowerCase().split(' ');

    if(command == `${config.prefix}undefined`) return;

    let cmd = bot.commands.get(command.slice(config.prefix.length)) || bot.commands.get(bot.aliases.get(command.slice(config.prefix.length)));

    if(cmd){
        console.log(`${command.toUpperCase().slice(config.prefix.length)}: actived by ${msg.author.username} (${msg.author.id}, ${msg.channel.id}, ${msg.guild.id})`);
        
        if(msg.guild.me.permissionsIn(msg.channel).toArray().indexOf('SEND_MESSAGES') < 0){
            return;
        }

        let owner = false;
        let illegal = false;

        if(msg.author.id == config.owner){owner = true}

        function check(){
            if(owner == true){
                illegal = true;
                return false;
            }else{
                return true
            }
        }

        if((cmd.config.category == "owner" || cmd.config.category === "private") && !owner){
            return msg.channel.send(error(`👮‍♂️ You aren't the bot owner.`))
        }

        if(cmd.config.cmdperms){
            cmd.config.cmdperms.forEach(perm => {
                if(!msg.guild.me.hasPermission(perm)){
                    if(check()){
                        return msg.channel.send(error(`🚫 Bot doesn't have required permissions.\n\`${perm}\``))
                    }
                }
            })
        }
        
        if(cmd.config.category == "nsfw" && !msg.channel.nsfw){
            if(check()){
                return msg.channel.send(error(`🔞 This command is only allowed in a NSFW channel.`))
            }
        }

        if(!(msg.member.hasPermission(["ADMINISTRATOR"]))){ 
            if(cmd.config.perms){
                if(!msg.member.hasPermission(cmd.config.perms)){
                    if(check()){
                        return msg.channel.send(error(`🚷 You don't have the required permissions for that command.`))
                    }
                }
            }
        }

        if(cmd.config.servers){
            if(cmd.config.servers.indexOf(msg.guild.id.toString()) < 0){
                if(check()){
                    return msg.channel.send(error(`⛔ This command isn't available on this server.`));
                }
            }
        }

        if(illegal){
            msg.channel.send(error(`⚠️ You are doing something that you shouldn't!\nThis message and yours with autodestruct in 10 seconds if you don't confirm.`))
            .then(ms => {
                let emote = '✅';
                ms.react(emote);
                const filter = (reaction, user) => user.id === config.owner && reaction.emoji.name === emote
                ms.awaitReactions(filter, { max: 1, time: 10000, errors: ['time']})
                .then(collected => {
                    try{ms.delete()}catch{}
                    run();
                })
                .catch(() => {
                    try{msg.delete()}catch{}
                    try{ms.delete()}catch{}
                })
            })
        }else{
            run()
        }

        function run(){
            try{
                cmd.run(bot, msg, args, config);
            }catch(err){console.log(err)}
        }

    }else{
        console.log(`${command.toUpperCase().slice(config.prefix.length)}: (REJECTED) actived by ${msg.author.username} (${msg.author.id}, ${msg.channel.id}, ${msg.guild.id})`);
        msg.channel.send(error(`🛑 Command \`${command}\` doesn't exist or isn't loaded correctly.`));
    }
}

function error(error){
    return new RichEmbed()
    .setTitle('ERROR!')
    .setDescription(error)
    .setColor('FF0000')
}

module.exports.config = {
    event: "message"
}
