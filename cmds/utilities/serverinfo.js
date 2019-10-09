const Discord = require("discord.js");

module.exports.run = async (bot, msg, args) => {
	console.log(`Server: actived by ${msg.author.username} (${msg.author.id})`);
	let embed = new Discord.RichEmbed()
		.setAuthor(msg.author.username)
		.setDescription("These are the informations about the server you're in!")
		.setColor("#420FF")
		.addField("Server name", `${msg.guild.name}`)
		.addField("Server ID", `${msg.guild.id}`)
		.addField("Server region", `${msg.guild.region}`)
		.addField("Entering channel", `${msg.guild.systemChannel}`)
		.addField("Verification level", `${msg.guild.verificationLevel}`)
		.addField("Owner", `${msg.guild.owner} (${msg.guild.ownerID})`)
		.addField("Member count", `${msg.guild.memberCount}`)
		.addField("Is the server large?", `${msg.guild.large}`)
		.addField("Created at", `${msg.guild.createdAt}`);
	msg.channel.send(embed);
}

module.exports.help = {
	name: "serverinfo"
}