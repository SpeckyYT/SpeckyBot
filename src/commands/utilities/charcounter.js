module.exports = {
    name: "charcounter",
    description: "Here you can grab some info from your sentences!",
    usage: `<sentence/word/emotes>`,
    category: "utilities",
    aliases: ["cc","ccounter","sentencestats"]
}

module.exports.run = async (bot, msg) => {
    const { Args } = msg;
    const embed = bot.embed()
    .setAuthor(msg.author.username)
    .addField("Characters", `${Args.join(" ").length}`)
    .addField("Words", `${Args.length}`)
    .addField("Whitespaces", `${Args.length}`)
    msg.channel.send(embed)
}
