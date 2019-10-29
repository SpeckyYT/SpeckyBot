const { RichEmbed } = require('discord.js')
const os = require('os')

module.exports.run = async (bot, msg, args, owner, prefix) => {
    let cEmbed = new RichEmbed()
    .setColor('#FF00AA')
    .setDescription('Here are some stats about the server that is running the bot')
    .setAuthor(`${bot.user.username}`, msg.guild.iconURL)
    .addField(`Operative System Type:`, os.type())
    .addField(`System Uptime:`, `${os.uptime()} seconds`)
    .addField(`Free RAM Memory:`, `${os.freemem() / 1000000}MB`)
    .addField(`Total RAM Memory:`, `${os.totalmem() / 1000000}MB`)
    .addBlankField()
//  .addField(`Permissions:`, `${msg.guild.fetchMember(bot.user.id).permissions()}`)
    .setTimestamp()
    .setFooter(`${bot.user.username}`, bot.user.displayAvatarURL)

    msg.channel.send({embed: cEmbed})
}

module.exports.config = {
    name: "stats",
	description: "Gives some stats about the bot!",
    usage: ``,
    category: `misc`,
	accessableby: "Members",
    aliases: ["status","st"]
}