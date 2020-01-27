const { Collection } = require("discord.js");

module.exports = async (bot) => {
    bot.setMaxListeners(25);
    
    bot.stats = {};
    bot.stats.commandsExecuted = 0;
    bot.stats.slots = 0;

    bot.cache = {};
    bot.cache.lastImage = {};
    bot.cache.console = {};
    bot.cache.console.debug = false;

    bot.snowflake = require('node-snowflake').Snowflake.nextId;

    bot.debugN = 0;

    bot.config = require('../config.json');

    require('./botfunctions')(bot);

    ["commands","aliases","console","consoleali"].forEach(async x => 
        bot[x] = new Collection()
    );

    ["events", "commands", "console","music"].forEach(async x => {
        bot.log(`\n\nLoading ${x.toUpperCase()}!\n`.info);
        require(`./${x}`)(bot)
    });
}
