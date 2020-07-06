module.exports = {
    name: "skip",
    description: "Skips the playing song!",
    usage: ``,
    category: `music`,
    aliases: ["s"]
}

module.exports.run = async (bot, msg) => {
    const { args } = msg;
    bot.music.skipFunction(msg, args.join(' '))
}
