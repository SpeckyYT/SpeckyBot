module.exports = (bot) => {
    bot.music = require("discord.js-musicbot-addon");

    ["events","commands","aliases"].forEach(async x => 
        bot[x] = new Collection()
    );

    ["events", "commands", "console","music"].forEach(async x => {
        console.log(`\n\nLoading ${x.toUpperCase()}!\n`);
        require(`./${x}`)(bot)
    });
}
