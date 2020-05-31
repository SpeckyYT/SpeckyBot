module.exports = {
    name: "queue",
    description: "Gives you the songs queue!",
    usage: ``,
    category: `music`,
    accessableby: "Members",
    aliases: ["q","qu","que"]
}

module.exports.run = async (bot, msg) => {
    const { args } = msg;
    bot.music.queueFunction(msg, args.join(' '))
}
