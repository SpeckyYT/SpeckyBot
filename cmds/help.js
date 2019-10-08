const Discord = require("discord.js");

module.exports.run = async (bot, msg, args) => {
	console.log(`Help: actived by ${msg.author.username} (${msg.author.id})`);
	let embed = new Discord.RichEmbed()
		.setAuthor(msg.author.username)
		.setDescription("This is the help page!")
		.setColor("#000000")
		.addField("Information commands", `userinfo | serverinfo`)
		.addField("Voice channels commands", `join | leave | play`);
	msg.channel.send(embed);
}

module.exports.help = {
	name: "help"
}