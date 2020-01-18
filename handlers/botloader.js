const { Collection } = require("discord.js");
const config = require('../config.json')

module.exports = async (bot) => {
    bot.stats = {};
    bot.stats.commandsExecuted = 0;
    bot.stats.slots = 0;

    bot.cache = {};
    bot.cache.lastImage = {};

    bot.snowflake = require('node-snowflake').Snowflake.nextId;

    bot.debugN = 0;

    bot.config = config;

    require('./botfunctions')(bot);

    ["commands","aliases"].forEach(async x => 
        bot[x] = new Collection()
    );

    ["events", "commands", "console","music"].forEach(async x => {
        bot.log(`\n\nLoading ${x.toUpperCase()}!\n`);
        require(`./${x}`)(bot)
    });
}
