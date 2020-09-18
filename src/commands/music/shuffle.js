module.exports = {
    name: "shuffle",
    description: "Shuffles the queue!",
    category: "music",
    aliases: ["shuffl"]
}

module.exports.run = async (bot, msg) => {
    bot.music.shuffle(msg);
}
