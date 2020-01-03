module.exports.run = async (bot, msg) => {
    let { args } = msg;
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
