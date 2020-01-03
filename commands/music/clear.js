module.exports.run = async (bot, msg) => {
    let { args } = msg;
    bot.music.clearFunction(msg, args.join(' '))
}

module.exports.config = {
    name: "clear",
	description: "Clears the queue!",
    usage: ``,
    category: `music`,
	accessableby: "Members",
    aliases: ["c"]
}
