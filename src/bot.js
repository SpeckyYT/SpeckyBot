const { Client } = require('discord.js');

module.exports = (bot) => {
    if(bot && bot.destroy) bot.destroy();
    
    bot = new Client({
        autoReconnect: true,
        messageCacheMaxSize: 10000,
        fetchAllMembers: true,
        messageCacheLifetime: 432000,
    })

    require('./generalhandler')(bot);
}
