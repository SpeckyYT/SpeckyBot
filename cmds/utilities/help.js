const Discord = require("discord.js");

module.exports.run = async (bot, msg, args, owner, prefix) => {
	if(args[0] === "help") return msg.channel.send(`Just do ${prefix}help instead`)

	if(args[0]){
		msg.delete();
		let cmd = args[0];
		if(bot.commands.has(cmd)){
			cmd = bot.commands.get(cmd);
			let embed = new Discord.RichEmbed()
			.setColor("#000000")
			.setAuthor('SpeckyBot Help', msg.guild.iconURL)
			.setDescription(`The bot prefix is: ${prefix}\n\n**Command:** ${cmd.config.name}\n**Description:** ${cmd.config.description || "No Description"}\n**Usage:** ${cmd.config.usage || "No Usage"}\n**Aliases** ${cmd.config.aliases || cmd.config.noaliases}`);
			msg.channel.send(embed);
		}
	}
	if(!args[0]){
		msg.delete();
		let embed = new Discord.RichEmbed()
		.setAuthor(`Help Command!`, msg.guild.iconURL)
		.setColor("#000000")
		.setDescription(`${msg.author.username} check your DMs!`)

		let Sembed = new Discord.RichEmbed()
		.setAuthor(`${bot.user.username} Help`, msg.guild.iconURL)
		.setColor("#000000")
		.setThumbnail(bot.user.displayAvatarURL)
		.setTimestamp()
		.setDescription(`These are the avaiable commands for SpeckyBot!\nThe bot prefix is: ${prefix}`)
		.addField(`Commands:`, `||this will be added soon||`)
		.setFooter(`${bot.user.username}`, bot.user.displayAvatarURL);
		msg.channel.send(embed).then(m => m.delete(10000));
		msg.author.send(Sembed);
	}
}

module.exports.config = {
	name: "help",
    aliases: ["h", "halp", "hel"]
}