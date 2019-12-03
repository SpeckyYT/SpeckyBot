module.exports.run = async (bot, msg, args, config) => {
    bot.music.playFunction(msg, args.join(' '))
}

module.exports.config = {
    name: "play",
	description: "Plays a song by choice!",
    usage: `<song>`,
    category: `music`,
	accessableby: "Members",
    aliases: ["p"]
}
