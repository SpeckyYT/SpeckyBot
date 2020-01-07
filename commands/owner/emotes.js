module.exports.run = async (bot, msg) => {
    bot.emojis.forEach((emoji, e) => {
        msg.channel.send(`${e}\n${emoji.url}`)
    })
}

module.exports.config = {
    name: "emotes",
	description: "Sends all emotes which the bot can access to.",
    usage: ``,
    category: `owner`,
	accessableby: "Bot Owner",
    aliases: ["emoji","emojis","emote"]
}
