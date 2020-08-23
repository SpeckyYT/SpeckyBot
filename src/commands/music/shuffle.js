module.exports = {
    name: "shuffle",
    description: "Shuffles the queue!",
    usage: "",
    category: `music`,
    aliases: ["shuffl"]
}

module.exports.run = async (bot, msg) => {
    bot.music.shuffle(msg);
}
