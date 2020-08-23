module.exports = {
    name: "queue",
    description: "Gives you the songs queue!",
    usage: "",
    category: `music`,
    aliases: ["q","qu","que"]
}

module.exports.run = async (bot, msg) => {
    bot.music.showQueue(msg);
}
