const { Client } = require('discord.js');
const { join } = require('path');

module.exports = async (bot) => {
    if(bot && bot.destroy) await bot.destroy();

    bot = new Client({
        autoReconnect: true,
        messageCacheMaxSize: 10000,
        fetchAllMembers: true,
        messageCacheLifetime: 432000,
    })

    require(join(__dirname,'generalhandler'))(bot);
}
