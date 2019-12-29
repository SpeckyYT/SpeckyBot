const { RichEmbed } = require('discord.js')

module.exports.run = async (bot, msg, args, config) => {
    let member;
    if(msg.mentions.users.first()){
        member = msg.mentions.users.first();
    }else{
        member = msg.author;
    }
    msg.channel.send(
        new RichEmbed()
        .setTitle(member.tag)
        .setImage(member.avatarURL)
        .setDescription(`[Link](${member.avatarURL})`)
    )
}

module.exports.config = {
    name: "avatar",
	description: "Wanna see your profile picture?",
    usage: `[@member]`,
    category: `utilities`,
	accessableby: "Members",
    aliases: ["a","ava"]
}