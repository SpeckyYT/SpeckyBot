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
    
    const { token } = require('../config.json')
        
    bot.login(token).catch(() => {
        for(var i = 0; i < 50; i++){
            console.log(`PLEASE EDIT THE CONFIG.JSON FILE (token is incorrect or can't login to discord)`)
        }
    })
}
