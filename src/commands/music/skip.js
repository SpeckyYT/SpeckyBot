module.exports = {
    name: "skip",
    description: "Skips the playing song!",
    category: "music",
    aliases: ["s"]
}

module.exports.run = async (bot, msg) => {
    bot.music.skip(msg)
}
