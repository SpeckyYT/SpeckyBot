const Discord = require("discord.js");

module.exports.run = async (bot, msg, args, config) => {
    if(!args[0]){
        console.log(msg.member.permissionsIn(msg.channel))
        let cEmbed = new Discord.RichEmbed()
        .setTitle(`Permissions of ${msg.author.username}`)
        .addField(`Permissions:`, `${msg.member.permissionsIn(msg.channel)}`)
        msg.channel.send(cEmbed);
    }else{}
        
}

module.exports.config = {
    name: "checkperms",
	description: "Checks the permissions of the user!",
    usage: `[userID]`,
    category: `misc`,
	accessableby: "Members",
    aliases: ["checkpermissions","checkp","cp"]
}