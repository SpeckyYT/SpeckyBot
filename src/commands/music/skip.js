module.exports = {
    name: "skip",
    description: "Skips the playing song!",
    usage: "",
    category: `music`,
    aliases: ["s"]
}

module.exports.run = async (bot, msg) => {
    bot.music.skip(msg)
}
