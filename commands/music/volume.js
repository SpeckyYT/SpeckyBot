module.exports.run = async (bot, msg, args, config) => {
    bot.music.volumeFunction(msg, args.join(' '))
}

module.exports.config = {
    name: "volume",
	description: "Changes the volume of the player!",
    usage: ``,
    category: `music`,
	accessableby: "Members",
    aliases: []
}
