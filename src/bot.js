const { Client } = require('discord.js');
const { join } = require('path');

const summon = async (bot) => {
    if(process.cwd() != __dirname) process.chdir(__dirname);

    if(bot && typeof bot.destroy == 'function') await bot.destroy();

    bot = new Client({
        autoReconnect: true,
        messageCacheMaxSize: 10000,
        messageCacheLifetime: 86400,
        messageSweepInterval: 60,
        retryLimit: 5,
        disableMentions: 'everyone',
        fetchAllMembers: false
    })

    return require(join(__dirname,'generalhandler'))(bot);
}

module.exports = summon;

if(module.children.length <= 1) summon();
