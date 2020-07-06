module.exports = {
    name: "loop",
    description: "Loops the song!",
    usage: ``,
    category: `music`,
    aliases: ["l"]
}

module.exports.run = async (bot, msg) => {
    const { args } = msg;
    bot.music.loopFunction(msg, args.join(' '))
}
