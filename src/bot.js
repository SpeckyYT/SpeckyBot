const { Client } = require('discord.js');
const { join } = require('path');

module.exports = async (bot) => {
    if(process.cwd() != __dirname) process.chdir(__dirname);

    if(bot && bot.destroy) await bot.destroy();

    bot = new Client({
        autoReconnect: true,
        messageCacheMaxSize: 10000,
        messageCacheLifetime: 86400,
        messageSweepInterval: 60,
        retryLimit: 3,
        disableMentions: 'all',
        fetchAllMembers: false
    })

    require(join(__dirname,'generalhandler'))(bot);
}
