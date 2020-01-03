const { Collection } = require("discord.js");
const config = require('../config.json')

module.exports = async (bot) => {
    bot.stats = {};
    bot.stats.commandsExecuted = 0;

    bot.config = config

    bot.functions = {};

    bot.functions.msToTime = (ms) => {
        const mil = Math.floor((ms % 1000)).toString();
        const sec = Math.floor((ms / 1000) % 60).toString();
        const min = Math.floor((ms / (1000 * 60)) % 60).toString();
        const hrs = Math.floor((ms / (1000 * 60   * 60)) % 24).toString();
        const day = Math.floor((ms / (1000 * 60   * 60   * 24)) % 60).toString();
        return `${day.padStart(1, "0")}d ${hrs.padStart(2, "0")}h ${min.padStart(2, "0")}m ${sec.padStart(1, "0")}s ${mil.padStart(3, "0")}ms`
    }

    bot.functions.startTyping = async (channel) => {
        channel.startTyping(1)
    }

    bot.functions.stopTyping = async (channel) => {
        channel.stopTyping(true)
    }

    ["commands","aliases"].forEach(async x => 
        bot[x] = new Collection()
    );

    ["events", "commands", "console","music"].forEach(async x => {
        console.log(`\n\nLoading ${x.toUpperCase()}!\n`);
        require(`./${x}`)(bot)
    });
}
