const { Collection } = require("discord.js");

module.exports = async (bot) =>{
    ["events","commands","aliases"].forEach(async x => 
        bot[x] = new Collection()
    );

    ["events", "commands", "console","music"].forEach(async x => {
        console.log(`\n\nLoading ${x.toUpperCase()}!\n`);
        require(`./${x}`)(bot)
    });
}