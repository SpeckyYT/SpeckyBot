module.exports = {
    name: "charcounter",
	description: "Here you can grab some info from your sentences!",
    usage: `<sentence/word/emotes>`,
    category: `utilities`,
	accessableby: "Members",
    aliases: ["cc","ccounter","sentencestats"]
}

const { RichEmbed } = require('discord.js')

module.exports.run = async (bot, msg) => {
    let { Args } = msg;
    let words = Args.join(' ')
    let embed = new RichEmbed()
    .setAuthor(msg.author.username)
    .setColor("#FF00AA")
    .addField("Characters", `${Args.join(" ").length}`)
    .addField("Words", `${Args.length}`)
    //.addField("Sentences", `${words.split(". ").lenght + words.split("! ").length + words.split("? ").length + words.split("‽ ").length - 4}`)
    .addField("Whitespaces", `${Args.length}`)
    msg.channel.send(embed)
}
