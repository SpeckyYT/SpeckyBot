const { RichEmbed } = require('discord.js')
const os = require('os')

module.exports.run = async (bot, msg) => {
    let full = '█'
    let empty = '░'
    let precision = 15

    let totalRAM = os.totalmem()
    let usedRAM = os.totalmem() - os.freemem()
    let freeRAM = os.freemem()

    let usedPercentRAM = Math.round(usedRAM * 100 / totalRAM)
    let freePercentRAM = Math.round(freeRAM * 100 / totalRAM)

    let usedDiagRAM = Math.round(usedPercentRAM / 100 / precision)
    let freeDiagRAM = Math.round(freePercentRAM / 100 / precision)

    let cEmbed = new RichEmbed()
    .setColor('#FF00AA')
    .setDescription('Here are some stats about the server that is running the bot')
    .setAuthor(`${bot.user.username}`, msg.guild.iconURL)
    .addField(`Ping:`,`${bot.ping}`)
    .addField(`Used:`, `RAM: ${full.repeat(usedDiagRAM)}${empty.repeat(freeDiagRAM)} [${Math.round(usedPercentRAM)}%]`)
    .addBlankField()
    .addField(`Total Executed Commands`, `${bot.stats.commandsExecuted} Commands`,true)
    .addField(`Bot Uptime`,`${bot.formatTime(bot.uptime)}`,true)
    .setTimestamp()
    .setFooter(`${bot.user.username}`, bot.user.displayAvatarURL)

    msg.channel.send(cEmbed)
}

module.exports.config = {
    name: "stats",
	description: "Gives some stats about the bot!",
    usage: ``,
    category: `misc`,
	accessableby: "Members",
    aliases: ["status","st"]
}