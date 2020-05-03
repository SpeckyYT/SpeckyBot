const { Client } = require('discord.js');

module.exports = (bot) => {
    bot = new Client({
        autoReconnect: true,
        messageCacheMaxSize: 10000,
        fetchAllMembers: true,
        messageCacheLifetime: 432000,
    });

    require('./handlers/generalhandler')(bot);
}

