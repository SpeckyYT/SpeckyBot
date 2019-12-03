module.exports.run = async (bot, msg, args, config) => {
    bot.music.loopFunction(msg, args.join(' '))
}

module.exports.config = {
    name: "loop",
	description: "Loops the song!",
    usage: ``,
    category: `music`,
	accessableby: "Members",
    aliases: ["l"]
}
