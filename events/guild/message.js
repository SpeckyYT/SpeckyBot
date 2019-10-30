const { RichEmbed, deletable } = require('discord.js')

module.exports = async (bot, msg) => {
    const s_settings = require('../../../s_settings.json')
    const u_settings = require('../../../u_settings.json')
    const { prefix, owner } = require('../../../config.json')
    var color;
    try{
        if (msg.author.bot || msg.channel.type === "dm") return;
        if(s_settings[msg.guild.id]){
            if(s_settings[msg.guild.id].mtechannel){
                if(msg.channel.id == s_settings[msg.guild.id].mtechannel){
                    try{
                        console.log(`${msg.author.username} "${msg.content}" (${msg.author.id}, ${msg.channel.id}, ${msg.guild.id})`);
//                       if(msg.deletable()){
                            if(u_settings[msg.member.id]){
                                if(u_settings[msg.member.id].embedcolor){
                                    color = `${u_settings[msg.member.id].embedcolor}`;
                                }
                            }else{
                                color = "000000";
                            }
                                var embed = new RichEmbed()
                                    .setAuthor(`${msg.author.username}`, `${msg.author.avatarURL}`)
                                    .setDescription(`${msg.content}`)
                                    .setColor(`#${color}`);
                                msg.delete();
                                msg.channel.send(embed);
                            
//                        }else(console.log("Message is not deletable"))
                    }catch(e){
                        console.log("Error in MTE system (message.js) occourred");
                    }
                }
            }
        }   
    }catch(err){console.log(err)}
    

    if (!msg.content.toLowerCase().startsWith(prefix) || msg.author.bot || msg.channel.type === "dm") return;
    
    let args = msg.content.toLowerCase().split(" ");
    let command = args[0];
    args = args.slice(1);
    
    let cmd = bot.commands.get(command.slice(prefix.length)) || bot.commands.get(bot.aliases.get(command.slice(prefix.length)));
    if(cmd){
        console.log(`${command.toUpperCase().slice(prefix.length)}: actived by ${msg.author.username} (${msg.author.id}, ${msg.channel.id}, ${msg.guild.id})`);
        cmd.run(bot, msg, args, owner, prefix);
    }else{
        console.log(`${command.toUpperCase().slice(prefix.length)}: (REJECTED) actived by ${msg.author.username} (${msg.author.id})`);
        msg.reply("we didn't find the commad you were looking for. Sowwy UwU");
    }
}