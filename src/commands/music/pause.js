module.exports = {
    name: "pause",
    description: "Pauses the playing song!",
    category: "music",
    aliases: ["paus"]
}

module.exports.run = async (bot, msg) => {
    bot.music.pause(msg);
}
