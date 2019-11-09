const { RichEmbed } = require("discord.js");

module.exports.run = async (bot, msg, args, owner, prefix) => {
    if(!msg.member.hasPermission(["MANAGE_MESSAGES"]) && !msg.member.hasPermission(["ADMINISTRATOR"]) && !(msg.member.id == owner)){
        msg.channel.send("You can't use this command!");
        return;
    }else{
        args = msg.content.split(" ");
        const maxtimes = 100;
        var times = 0;
        while((args[0] == prefix) && (times <= maxtimes)){
            const fix = `${args[0]}${args[1]}`
            args[1] = fix;
            args = args.slice(1);
        }
        args = args.splice(1);
        let argsresult;
        let channel = msg.mentions.channels.first();
        let cEmbed = new RichEmbed()
            .setTitle(msg.author.username, msg.author.avatarURL)
            .setDescription(argsresult);
        if(channel){
            argsresult = msg.content.split(" ").slice(2).join(" ");
            channel.send(argsresult);
        }else{
            argsresult = args.join(" ");
            msg.channel.send(argsresult);
        }
        msg.delete(5000);
    }
}

module.exports.config = {
    name: "say",
	description: "Lets the bot say something for you!",
    usage: `<text> [include "Emb:" for embed]`,
    category: `admin`,
	accessableby: "Server Admins and Moderators",
    aliases: ["announcement"]
}