module.exports = {
    name: "stats",
    description: "Gives some stats about the bot!",
    category: "misc",
    aliases: ["status","st"]
}

const { MessageEmbed } = require('discord.js');
const os = require('os');
const osu = require('node-os-utils');

module.exports.run = async (bot, msg) => {
    const notSupported = "Operative system not supported"
    const full = '█'
    const empty = '░'
    const precision = 20

    const freeRAM = os.freemem()
    const usedRAM = os.totalmem() - freeRAM;

    const diagramMaker = (used,free) => {
        const total = used + free;
        used = Math.round((used / total) * precision)
        free = Math.round((free / total) * precision)
        return full.repeat(used) + empty.repeat(free)
    }

    let cpuUsage;

    const p1 = osu.cpu.usage()
    .then(cpuPercentage => {
        cpuUsage = cpuPercentage;
    })

    let processes;

    const p2 = osu.proc.totalProcesses()
    .then(process => {
        processes = process;
    })

    let driveUsed, driveFree;

    const p3 = osu.drive.info()
    .then(i => {
        driveUsed = i.usedPercentage;
        driveFree = i.freePercentage;
    })
    .catch(() => {
        driveUsed = false;
    })

    let networkUsage, networkUsageIn, networkUsageOut;

    const p4 = osu.netstat.inOut()
    .then(i => {
        networkUsage = i.total;
        networkUsageIn = networkUsage.inputMb;
        networkUsageOut = networkUsage.outputMb;
    })
    .catch(() => {
        networkUsage = false;
    })

    await Promise.all([p1,p2,p3,p4]);

    const embed = new MessageEmbed()
    .setColor(bot.config.color)
    .setDescription('Here are some stats about the bot and other stuff')
    .setAuthor(`${bot.user.username}`, bot.user.avatarURL())
    .addField(`Ping:`,`${Math.round(bot.ws.ping)}`)
    .addField(`Used:`,(`RAM: ${diagramMaker(usedRAM, freeRAM)} [${Math.round(100 * usedRAM / (usedRAM + freeRAM))}%]\n`+
    `CPU: ${diagramMaker(cpuUsage, 100-cpuUsage)} [${Math.round(cpuUsage)}%]\n`+
    `${bot.user.username.toUpperCase()} PROCESS: ${(process.memoryUsage().heapUsed / 1000000).toFixed(2)}MB\n`+
    `STORAGE: ${driveUsed ? `${diagramMaker(driveUsed, driveFree)} [${Math.round(driveUsed)}%]` : notSupported}\n`+
    `PROCESSES: ${processes != 'not supported'? processes : notSupported}`).trim())
    .addField(`Machine Specs:`,`CPU Count: ${osu.cpu.count()}\nCPU Model: ${os.cpus()[0].model}\nCPU Speed: ${os.cpus()[0].speed}MHz
${osu.os.platform() != "win32" ? `Storage: ${diagramMaker(driveUsed,driveFree)} [${driveUsed}%]`: ""}`)
    .addField(`System Specs:`,`System Type: ${osu.os.type()}\nSystem Architecture: ${osu.os.arch()}\nSystem Platform: ${osu.os.platform()}`)
    .addField(`Network Stats:`,`${networkUsage ? `Input Speed: ${networkUsageIn}\nOutput Speed: ${networkUsageOut}` : notSupported}`)
    .addField('\u200b','\u200b')
    .addField(`Total Users:`,`${bot.users.cache.size}`,true)
    .addField(`Total Emotes:`,`${bot.emojis.cache.size}`,true)
    .addField(`Total Guilds:`,`${bot.guilds.cache.size}`,true)
    .addField('\u200b','\u200b')
    .addField(`Total Executed Commands:`, `${bot.stats.commandsExecuted} Commands`)
    .addField(`Slots Winners:`,`${bot.stats.slots}`)
    .addField(`Bot Uptime:`,`${bot.formatTime(bot.uptime)}`,true)
    .addField(`Process Uptime:`,`${bot.formatTime(process.uptime()*1000)}`,true)
    .setTimestamp()
    .setFooter(`${bot.user.username}`, bot.user.displayAvatarURL());

    msg.channel.send(embed)
}
