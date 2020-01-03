module.exports.run = async (bot, msg) => {
    let { args } = msg;
    bot.music.queueFunction(msg, args.join(' '))
}

module.exports.config = {
    name: "queue",
	description: "Gives you the songs queue!",
    usage: ``,
    category: `music`,
	accessableby: "Members",
    aliases: ["q","qu","que"]
}
