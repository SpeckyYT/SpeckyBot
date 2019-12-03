module.exports.run = async (bot, msg, args, config) => {
    bot.music.pauseFunction(msg, args.join(' '))
}

module.exports.config = {
    name: "pause",
	description: "Pauses the playing song!",
    usage: ``,
    category: `music`,
	accessableby: "Members",
    aliases: ["stop","paus"]
}
