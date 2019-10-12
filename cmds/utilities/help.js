const Discord = require("discord.js");

module.exports.run = async (bot, msg, args) => {
	let embed = new Discord.RichEmbed()
		.setAuthor(msg.author.username)
		.setDescription("This is the help page!")
		.setColor("#000000")
		.addField("Utilities", `avatar | help | math | ping | serverinfo | uptime | userinfo | vc`)
		.addField("Music", `join | leave`)
		.addField("Games", `rps`)
		.addField("Misc", `gddiff`);
	msg.channel.send(embed);
}

module.exports.config = {
	name: "help",
    aliases: []
}