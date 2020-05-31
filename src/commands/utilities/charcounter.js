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
    const { Args } = msg;
    const embed = new RichEmbed()
    .setAuthor(msg.author.username)
    .setColor("#FF00AA")
    .addField("Characters", `${Args.join(" ").length}`)
    .addField("Words", `${Args.length}`)
    .addField("Whitespaces", `${Args.length}`)
    msg.channel.send(embed)
}
