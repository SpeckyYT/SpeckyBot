module.exports = {
    name: "loop",
    description: "Loops the song!",
    category: "music",
    aliases: ["l"]
}

module.exports.run = async (bot, msg) => {
    bot.music.loop(msg);
}
