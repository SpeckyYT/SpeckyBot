module.exports = {
    name: "clear",
    description: "Clears the queue!",
    usage: ``,
    category: `music`,
    accessableby: "Members",
    aliases: ["c"]
}

module.exports.run = async (bot, msg) => {
    const { args } = msg;
    bot.music.clearFunction(msg, args.join(' '))
}
