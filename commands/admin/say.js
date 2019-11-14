const { RichEmbed } = require("discord.js");

module.exports.run = async (bot, msg, args, config) => {
    args = msg.content.split(" ");
    while(args[0] == config.prefix){
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

module.exports.config = {
    name: "say",
	description: "Lets the bot say something for you!",
    usage: `<text> [include "Emb:" for embed]`,
    category: `admin`,
	accessableby: "Server Admins and Moderators",
    aliases: ["announcement"]
}