const { RichEmbed } = require('discord.js')
const os = require('os')
const osu = require('node-os-utils')

module.exports.run = async (bot, msg) => {
    let full = '█'
    let empty = '░'
    let precision = 15

    let usedRAM = os.totalmem() - os.freemem()
    let freeRAM = os.freemem()

    let diagramMaker = (used,free) => {
        let total = used + free;
        used = Math.round((used / total) * precision)
        free = Math.round((free / total) * precision)
        return full.repeat(used) + empty.repeat(free)
    }

    let cpuUsage;

    await osu.cpu.usage()
    .then(cpuPercentage => {
        cpuUsage = cpuPercentage;
    })

    let driveUsed, driveFree

    try{
        driveUsed = (await osu.drive.info()).usedPercentage
        driveFree = (await osu.drive.info()).freePercentage
    }catch(err){}

    let cEmbed = new RichEmbed()
    .setColor('#FF00AA')
    .setDescription('Here are some stats about the bot and other stuff')
    .setAuthor(`${bot.user.username}`, msg.guild.iconURL)
    .addField(`Ping:`,`${Math.round(bot.ping)}`)
    .addField(`Used:`, `RAM: ${diagramMaker(usedRAM, freeRAM)} [${Math.round(usedRAM)}%]
CPU: ${diagramMaker(cpuUsage, 100-cpuUsage)} [${Math.round(cpuUsage)}%]`)
    .addField(`Machiene Specs:`,`CPU Count: ${osu.cpu.count()}\nCPU Model: ${os.cpus()[0].model}\nCPU Speed: ${os.cpus()[0].speed}MHz
${osu.os.platform() != "win32" ? `Storage: ${diagramMaker(driveUsed,driveFree)} [${driveUsed}%]`: ""}`)
    .addField(`System Specs`,`System Platform: ${osu.os.platform()}\nSystem Type: ${osu.os.type()}\nSystem Architecture: ${osu.os.arch()}`)
    .addBlankField()
    .addField(`Total Users:`,`${bot.users.size}`,true)
    .addField(`Total Emotes:`,`${bot.emojis.size}`,true)
    .addField(`Total Guilds:`,`${bot.guilds.size}`,true)
    .addBlankField()
    .addField(`Total Executed Commands:`, `${bot.stats.commandsExecuted} Commands`,true)
    .addField(`Slots Winners:`,`${bot.stats.slots}`)
    .addField(`Bot Uptime:`,`${bot.formatTime(bot.uptime)}`,true)
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
