module.exports.run = async (bot, msg, args) => {
    console.log(`Uptime: actived by ${msg.author.username} (${msg.author.id})`);
    function duration(ms){
        const mil = Math.floor((ms % 1000)).toString();
        const sec = Math.floor((ms / 1000)).toString();
        const min = Math.floor((ms / (1000 * 60)) % 60).toString();
        const hrs = Math.floor((ms / (1000 * 60 * 60)) % 60).toString();
        const day = Math.floor((ms / (1000 * 60 * 60 * 24)) % 60).toString();
        return `${day.padStart(1, "0")} days, ${hrs.padStart(2, "0")} hours, ${min.padStart(2, "0")} minutes, ${sec.padStart(1, "0")} seconds, ${mil.padStart(3, "0")} milliseconds.`
    }

    msg.channel.send(`I have been online for: ${duration(bot.uptime)}`)
}

module.exports.help = {
    name: "uptime"
}