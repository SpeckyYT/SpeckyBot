const { RichEmbed } = require('discord.js')
const os = require('os')
const osu = require('node-os-utils')

module.exports.run = async (bot, msg) => {
    let notSupported = "Operative system not supported"
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

    let driveUsed, driveFree;

    try{
        driveUsed = (await osu.drive.info()).usedPercentage
        driveFree = (await osu.drive.info()).freePercentage
    }catch(err){driveUsed = false}

    let networkUsage, networkUsageIn, networkUsageOut;

    try{
        networkUsage  = (await osu.netstat.inOut()).total;
        networkUsageIn = networkUsage.inputMb;
        networkUsageOut = networkUsage.outputMb;
    }catch(err){networkUsage = false}

    let cEmbed = new RichEmbed()
    .setColor('#FF00AA')
    .setDescription('Here are some stats about the bot and other stuff')
    .setAuthor(`${bot.user.username}`, bot.user.iconURL)
    .addField(`Ping:`,`${Math.round(bot.ping)}`)
    .addField(`Used:`, `RAM: ${diagramMaker(usedRAM, freeRAM)} [${Math.round(100 * usedRAM / (usedRAM + freeRAM))}%]
CPU: ${diagramMaker(cpuUsage, 100-cpuUsage)} [${Math.round(cpuUsage)}%]
STORAGE: ${driveUsed ? `${diagramMaker(driveUsed, driveFree)} [${Math.round(driveUsed)}%]` : notSupported}`)
    .addField(`Machine Specs:`,`CPU Count: ${osu.cpu.count()}\nCPU Model: ${os.cpus()[0].model}\nCPU Speed: ${os.cpus()[0].speed}MHz
${osu.os.platform() != "win32" ? `Storage: ${diagramMaker(driveUsed,driveFree)} [${driveUsed}%]`: ""}`)
    .addField(`System Specs:`,`System Type: ${osu.os.type()}\nSystem Architecture: ${osu.os.arch()}\nSystem Platform: ${osu.os.platform()}`)
    .addField(`Network Stats:`,`${networkUsage ? `Input Speed: ${networkUsageIn}\nOutput Speed: ${networkUsageOut}` : notSupported}`)
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
