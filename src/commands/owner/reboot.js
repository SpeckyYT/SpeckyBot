module.exports = {
    name: "reboot",
    description: "Reboots the bot down!",
    category: "owner"
}

const { join } = require('path');

module.exports.run = async (bot, msg) => {
    await msg.channel.send('Rebooting!');

    // Remove Listeners
    bot.removeAllListeners();

    // Destroys Bot
    bot.destroy();

    delete require.cache;

    return require(join(process.cwd(),'bot.js'))(bot);
}
