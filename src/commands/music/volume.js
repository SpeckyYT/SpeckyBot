module.exports = {
    name: "volume",
    description: "Changes the volume of the player!",
    usage: ``,
    category: `music`,
    accessableby: "Members",
    aliases: []
}

module.exports.run = async (bot, msg) => {
    const { args } = msg;
    bot.music.volumeFunction(msg, args.join(' '))
}
