module.exports = {
    name: "reboot",
    description: "Reboots the bot down!",
    category: "owner"
}

const { join } = require('path');

module.exports.run = async (bot, msg) => {

    // Remove Listeners
    bot.removeAllListeners();

    // Remove Intervals
    bot.intervals.forEach(i => {
        bot.clearInterval(i)
    })

    // Destroys Bot
    await bot.destroy();

    delete require.cache;

    return require(join(process.cwd(),'bot.js'))(bot);
}
