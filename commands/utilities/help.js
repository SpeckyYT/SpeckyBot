const { RichEmbed } = require("discord.js");
const { readdirSync } = require("fs")

module.exports.run = async (bot, msg, args, config) => {
	var embed = new RichEmbed()
	.setColor('#FF00AA')
	.setAuthor(`${msg.guild.me.displayName} Help`, msg.guild.iconURL)
	.setThumbnail(bot.user.displayAvatarURL)

	if(!args[0]) {
		let categories = readdirSync('./commands/')

		embed.setDescription(`These are the avaliable commands for ${msg.guild.me.displayName}\nThe bot prefix is: **${config.prefix}**`)
		embed.setFooter(`© ${msg.guild.me.displayName} | Total Commands: ${bot.commands.size}`, bot.user.displayAvatarURL);

		categories.forEach(category => {
			let dir = bot.commands.filter(c => (c.config.category === category && c.config.category != "private"))
			let capitalise = category.slice(0, 1).toUpperCase() + category.slice(1)
			try{
				if(!(category == "nsfw" && !msg.channel.nsfw) && !(category == "owner" && msg.author.id != config.owner)){
					embed.addField(`❯ ${capitalise} [${dir.size}]:`, `${dir.map(c => `\`${c.config.name}\``).join(" ")}`)
				}
			}catch{}
		})

		return msg.channel.send(embed)
	} else {
		let command = bot.commands.get(bot.aliases.get(args[0].toLowerCase()) || args[0].toLowerCase())
		if(!command) return msg.channel.send(embed.setTitle("Invalid Command.").setDescription(`Do \`${config.prefix}help\` for the list of the commands.`))
		command = command.config
		
		const cmd = command.name.slice(0, 1).toUpperCase() + command.name.slice(1)
		const description = command.description || "No Description provided."
		const usage = `${command.usage ? `\`${config.prefix}${command.name} ${command.usage}\`` : "No Usage"}`
		const usableby = command.accessableby || "Members"
		const aliases = `${command.aliases ? command.aliases.join(", ") : "None"}`
		const perms = `${command.perms ? command.perms.join(", ") : "None"}`
		const cmdperms = `${command.cmdperms ? command.cmdperms.join(", ") : "None"}`

		embed.setDescription(`The bot's prefix is: \`${config.prefix}\`\n\n**Command:** ${cmd}\n**Description:** ${description}\n**Usage:** ${usage}\n**Accessible by:** ${usableby}\n**Aliases:** ${aliases}\n**Required User Permissions:** ${perms}\n**Required Bot Permissions:** ${cmdperms}`)
		return msg.channel.send(embed)
	}
}

module.exports.config = {
	name: "help",
	description: "The help for this bot!",
	usage: `<command>`,
	category: `utilities`,
	accessableby: "Members",
    aliases: ["h", "halp", "hel","hwlp","cmds","commands"]
}