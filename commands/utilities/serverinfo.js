module.exports = {
	name: "serverinfo",
	description: "Informations about the server you're in!",
	usage: ``,
	category: `utilities`,
	accessableby: "Members",
    aliases: ["si","serveri"]
}

const { RichEmbed } = require("discord.js");

module.exports.run = async (bot, msg) => {

	var bots = 0, humans = 0;

	msg.guild.members.forEach(member => {
		if(member.user.bot){
			bots++;
		}else{
			humans++;
		}
	});

	let embed = new RichEmbed()
		.setAuthor(msg.author.username)
		.setDescription("These are the informations about the server you're in!")
		.setColor("#FF00AA")
		.setImage(msg.guild.iconURL)
		.addField("Server name", `${msg.guild.name}`)
		.addField("Server ID", `${msg.guild.id}`)
		.addField("Server region", `${msg.guild.region}`)
		.addField("Entering channel", `${msg.guild.systemChannel}`)
		.addField("Verification level", `${msg.guild.verificationLevel}`)
		.addField("Owner", `${msg.guild.owner} (${msg.guild.ownerID})`)
		.addField("Total Member count", `${msg.guild.memberCount}`,true)
		.addField("Human count", `${msg.guild.memberCount - bots}`,true)
		.addField("Bot count", `${bots}`,true)
		.addField("Is the server large?", `${msg.guild.large}`)
		.addField("Created at", `${msg.guild.createdAt}`);
	msg.channel.send(embed);
}
