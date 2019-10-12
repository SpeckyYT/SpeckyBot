const Discord = require("discord.js");

module.exports.run = async (bot, msg, args) => {
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

module.exports.config = {
	name: "userinfo",
    aliases: []
}