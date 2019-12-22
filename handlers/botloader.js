const { Collection } = require("discord.js");

module.exports = (bot) => {
    bot.music = require("discord.js-musicbot-addon");

    ["commands","aliases"].forEach(async x => 
        bot[x] = new Collection()
    );

    ["events", "commands", "console","music"].forEach(async x => {
        console.log(`\n\nLoading ${x.toUpperCase()}!\n`);
        require(`./${x}`)(bot)
    });
}
