const { RichEmbed } = require("discord.js");

module.exports.run = async (bot, msg) => {
	let embed = new RichEmbed()
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
	description: "Informations about the channel you're chatting in!",
	usage: ``,
	category: `utilities`,
	accessableby: "Members",
    aliases: ["ui","useri","usinfo"]
}
