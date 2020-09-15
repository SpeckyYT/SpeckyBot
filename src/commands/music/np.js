module.exports = {
    name: "nowplaying",
    description: "Gives you the name of the song!",
    category: `music`,
    aliases: ["np"]
}

module.exports.run = async (bot, msg) => {
    bot.music.nowPlaying(msg);
}
