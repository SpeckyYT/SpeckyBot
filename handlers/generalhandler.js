const { Client, Collection } = require("discord.js");

module.exports = () => {
    require('./missingfiles')().then(prom => {if(prom)return});
    
    const bot = new Client({autoReconnect:true});
    
    bot.music = require("discord.js-musicbot-addon");
    
    ["events","commands","aliases"].forEach(async x => 
        bot[x] = new Collection()
    );

    ["events", "commands", "console","music"].forEach(async x => {
        console.log(`\n\nLoading ${x.toUpperCase()}!\n`);
        require(`./${x}`)(bot)
    });
}
