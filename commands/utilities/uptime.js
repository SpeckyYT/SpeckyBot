module.exports.run = async (bot, msg, args, config) => {
    function duration(ms){
        const mil = Math.floor((ms % 1000)).toString();
        const sec = Math.floor((ms / 1000) % 60).toString();
        const min = Math.floor((ms / (1000 * 60)) % 60).toString();
        const hrs = Math.floor((ms / (1000 * 60 * 60)) % 60).toString();
        const day = Math.floor((ms / (1000 * 60 * 60 * 24)) % 60).toString();
        return `${day.padStart(1, "0")} days, ${hrs.padStart(2, "0")} hours, ${min.padStart(2, "0")} minutes, ${sec.padStart(1, "0")} seconds, ${mil.padStart(3, "0")} milliseconds.`
    }

    msg.channel.send(`I have been online* for: ${duration(bot.uptime)}\n*Since last reboot`)
}

module.exports.config = {
    name: "uptime",
	description: "Information about how long the bot has been online!",
    usage: ``,
    category: `utilities`,
	accessableby: "Members",
    aliases: ["upt"]
}