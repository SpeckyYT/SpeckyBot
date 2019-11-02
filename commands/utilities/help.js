const { RichEmbed } = require("discord.js");
const { readdirSync } = require("fs")

module.exports.run = async (bot, msg, args, owner, prefix) => {
	const embed = new RichEmbed()
	.setColor('#FF00AA')
	.setAuthor(`${msg.guild.me.displayName} Help`, msg.guild.iconURL)
	.setThumbnail(bot.user.displayAvatarURL)

	if(!args[0]) {
		const categories = readdirSync('./commands/')

		embed.setDescription(`These are the avaliable commands for ${msg.guild.me.displayName}\nThe bot prefix is: **${prefix}**`)
		embed.setFooter(`© ${msg.guild.me.displayName} | Total Commands: ${bot.commands.size}`, bot.user.displayAvatarURL);

		categories.forEach(category => {
			const dir = bot.commands.filter(c => c.config.category === category)
			const capitalise = category.slice(0, 1).toUpperCase() + category.slice(1)
			try {
				embed.addField(`❯ ${capitalise} [${dir.size}]:`, `${dir.map(c => `\`${c.config.name}\``).join(" ")}`) // `${dir.map(c => `\`${c.config.name}\``).join(" ")}`
			} catch(e) {
				//console.log(e)
			}
		})

		return msg.channel.send(embed)
	} else {
		let command = bot.commands.get(bot.aliases.get(args[0].toLowerCase()) || args[0].toLowerCase())
		if(!command) return msg.channel.send(embed.setTitle("Invalid Command.").setDescription(`Do \`${prefix}help\` for the list of the commands.`))
		command = command.config

		embed.setDescription(`The bot's prefix is: \`${prefix}\`\n
		**Command:** ${command.name.slice(0, 1).toUpperCase() + command.name.slice(1)}
		**Description:** ${command.description || "No Description provided."}
		**Usage:** ${command.usage ? `\`${prefix}${command.name} ${command.usage}\`` : "No Usage"}
		**Accessible by:** ${command.accessableby || "Members"}
		**Aliases:** ${command.aliases ? command.aliases.join(", ") : "None."}`)

		return msg.channel.send(embed)
	}
}

module.exports.config = {
	name: "help",
	description: "The help for this bot!",
	usage: `<command>`,
	category: `utilities`,
	accessableby: "Members",
    aliases: ["h", "halp", "hel","hwlp"]
}