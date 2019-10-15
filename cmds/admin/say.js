const Discord = require("discord.js");

module.exports.run = async (bot, msg, args, owner, prefix) => {
    if(!msg.member.hasPermission(["MANAGE_MESSAGES"]) && !msg.member.hasPermission(["ADMINISTRATOR"]) && !(msg.member.id == owner)){
        msg.channel.send("You can't use this command!");
        return;
    }else{
        let argsresult;
        let channel = msg.mentions.channels.first()
        if(channel){
            argsresult = msg.content.split(" ").slice(2).join(" ");
            channel.send(argsresult);
        }else{
            argsresult = msg.content.split(" ").slice(1).join(" ");
            msg.channel.send(argsresult);
        }
    }
}

module.exports.config = {
    name: "say",
	description: "Lets the bot say something for you!",
	usage: `<text>`,
	accessableby: "Server Admins and Moderators",
    aliases: ["announcement"]
}