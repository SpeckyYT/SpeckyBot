module.exports.run = async (bot, msg) => {
	let { args } = msg;
	bot.music.leaveFunction(msg, args.join(' '))
}

module.exports.config = {
	name: "leave",
	description: "Does the bot leave the VC!",
	usage: ``,
	category: `music`,
	accessableby: "Members",
	aliases: ["l"]
}
