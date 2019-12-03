module.exports.run = async (bot, msg, args, config) => {
    bot.music.npFunction(msg, args.join(' '))
}

module.exports.config = {
    name: "nowplaying",
	description: "Gives you the name of the song!",
    usage: ``,
    category: `music`,
	accessableby: "Members",
    aliases: ["np"]
}
