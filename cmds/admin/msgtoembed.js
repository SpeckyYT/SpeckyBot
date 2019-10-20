const fs = require("fs");

module.exports.run = async (bot, msg, args, owner, prefix) => {
    const msgtemb = require('../../../msgtoembed.json');
    if(!msg.member.hasPermission(["MANAGE_MESSAGES"]) && !msg.member.hasPermission(["ADMINISTRATOR"]) && !(msg.member.id == owner)){
        msg.channel.send("You can't use this command!");
        return;
    }else if(!msg.mentions.channels.first()){
        msg.channel.send("You have to tag a channel!")
        return;
    }else{

        msgtemb [msg.guild.id] = {
            channel: msg.mentions.channels.first().id,
            name: args[1]
        }
        fs.writeFile("../msgtoembed.json", JSON.stringify(msgtemb, null, 4), err => {
            if(err) throw err;
            msg.channel.send("Added! :ok_hand:")
        });
    }
}

module.exports.config = {
    name: "msgtoembed",
	description: "You can choose a channel where your messages get turned into embeds!",
    usage: `<text>`,
    category: `admin`,
	accessableby: "Server Admins and Moderators",
    aliases: ["mte","msgtemb"]
}