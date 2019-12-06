const { Client, Collection } = require("discord.js");

const bot = new Client({autoReconnect:true}); bot.music = require("discord.js-musicbot-addon");

["events","commands","aliases"].forEach(x => 
    bot[x] = new Collection()
);

["events", "commands", "console","music"].forEach(x => {
    console.log(`\n\nLoading ${x.toUpperCase()}!\n`);
    require(`./handlers/${x}`)(bot)
});

const { token, prefix } = require("./config.json");

try{
    bot.login(token)
}catch(e){
    console.log("Error occourred on logging in");
    process.exit();
}

console.log(`Bot prefix: ${prefix}`);