const { RichEmbed } = require('discord.js')

module.exports.run = async (bot, msg, args, owner, prefix) => {
    let embed = new RichEmbed()
    .setAuthor(msg.author.username)
    .setColor("#FF00AA")
    .addField("Characters", `${args.join(" ").length}`)
    .addField("Words", `${args.length}`);
    msg.channel.send(embed)
}

module.exports.config = {
    name: "charcounter",
	description: "Here you can grab some info from your sentences!",
    usage: `<sentence/word/emotes>`,
    category: `utilities`,
	accessableby: "Members",
    aliases: ["cc","ccounter","sentencestats"]
}