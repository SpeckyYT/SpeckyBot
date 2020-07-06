module.exports = {
    name: "nowplaying",
    description: "Gives you the name of the song!",
    usage: ``,
    category: `music`,
    aliases: ["np"]
}

module.exports.run = async (bot, msg) => {
    const { args } = msg;
    bot.music.npFunction(msg, args.join(' '))
}
