module.exports.run = async (bot, msg, args) => {
	console.log(`Userinfo: actived by ${msg.author.username} (${msg.author.id})`);
	let embed = new Discord.RichEmbed()
		.setAuthor(msg.author.username)
		.setDescription("This is your user profile!")
		.setColor("#284890")
		.addField("Full Username", `${msg.author.tag}`)
		.addField("ID", `${msg.author.id}`)
		.addField("Is he/she a bot?", `${msg.author.bot}`)
		.addField("Avatar", `${msg.author.displayAvatarURL}`)
		.addField("Last message", `${msg.author.lastMessage}`)
		.addField("Created at", `${msg.author.createdAt}`);
	msg.channel.send(embed);
}

module.exports.help = {
	name: "userinfo"
}