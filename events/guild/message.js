const { RichEmbed, deletable } = require('discord.js')

module.exports = async (bot, msg) => {
    const s_settings = require('../../../s_settings.json')
    const u_settings = require('../../../u_settings.json')
    const config = require('../../../config.json')
    var color;
    try{
        if (msg.author.id == bot.user.id || msg.channel.type == "dm") return;
        if(s_settings[msg.guild.id]){
            if(s_settings[msg.guild.id].mtechannel){
                s_settings[msg.guild.id].mtechannel.forEach(chan => {
                    if(msg.channel.id == chan){
                        try{
//                          console.log(`${msg.author.username} "${msg.content}" (${msg.author.id}, ${msg.channel.id}, ${msg.guild.id})`);
                            if(u_settings[msg.member.id]){
                                if(u_settings[msg.member.id].embedcolor){
                                    color = `${u_settings[msg.member.id].embedcolor}`;
                                }
                            }else{
                                color = `${(Math.random()*0xFFFFFF<<0).toString(16)}`;
                            }
                            var embed = new RichEmbed()
                                .setAuthor(`${msg.author.username}`, `${msg.author.avatarURL}`)
                                .setDescription(`${msg.content}`)
                                .setImage(msg.attachments.url)
                                .setColor(`#${color}`);
                            msg.delete();
                            msg.channel.send(embed);
                        }catch(e){
                            console.log("Error in MTE system (message.js) occurred");
                        }
                    }
                })
            }
        }   
    }catch(err){console.log(err)}
    

    if (!msg.content.toLowerCase().startsWith(config.prefix) || msg.author.bot || msg.channel.type === "dm") return;
    
    let args = msg.content.toLowerCase().split(/\s|\n/g);
    var command = args[0];

    while(args[0] == config.prefix){
        const fix = `${args[0]}${args[1]}`
        args[1] = fix;
        command = fix;
        args = args.slice(1);
    }

    args = args.slice(1);

    let cmd = bot.commands.get(command.slice(config.prefix.length)) || bot.commands.get(bot.aliases.get(command.slice(config.prefix.length)));
    if(cmd){
        console.log(`${command.toUpperCase().slice(config.prefix.length)}: actived by ${msg.author.username} (${msg.author.id}, ${msg.channel.id}, ${msg.guild.id})`);
        if(cmd.config.category === "owner"){
            if(!(msg.author.id === config.owner)){
                msg.channel.send("You aren't my owner.");
                return;
            }
        }

        if(cmd.config.category === "admin"){
            try{
                if( !(msg.member.hasPermission(["MANAGE_MESSAGES"])) &&
                    !(msg.member.hasPermission(["ADMINISTRATOR"])) &&
                    !(msg.member.id == config.owner)){
                        msg.channel.send("You can't use this command!");
                        return;
                    }
            }catch(e){
                return
            }
        }
        try{
            cmd.run(bot, msg, args, config);
        }catch(err){console.log(err)}
    }else{
        console.log(`${command.toUpperCase().slice(config.prefix.length)}: (REJECTED) actived by ${msg.author.username} (${msg.author.id}, ${msg.channel.id}, ${msg.guild.id})`);
        msg.reply("we didn't find the command you were looking for. Sowwy UwU");
    }
}