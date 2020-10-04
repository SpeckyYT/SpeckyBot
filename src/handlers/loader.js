const { readdirSync, readFileSync } = require('fs');
const { Collection } = require('discord.js');
const { join } = require('path');

module.exports = async (bot) => {
    bot.setMaxListeners(50);

    bot.stats = {};
    bot.stats.commandsExecuted = 0;
    bot.stats.slots = 0;

    bot.cache = {};
    bot.cache.messages = [];
    bot.cache.lastImage = {};
    bot.cache.console = {};
    bot.cache.console.debug = false;
    bot.cache.chatbot = {};
    bot.cache.cooldown = new Collection();
    bot.cache.runningcmds = [];
    bot.cache.globalchat = new Collection();
    bot.cache.math = {};

    bot.economy = {}

    bot.globalchats = new Collection();

    bot.userphone = []

    bot.debugN = 0;

    bot.settings = {};

    bot.config = JSON.parse(readFileSync(join(process.cwd(),'..','config.json')));

    if(typeof bot.config.apikeys == "object"){
        Object.keys(bot.config.apikeys).forEach(prop => {
            bot.config[prop] = bot.config.apikeys[prop];
        })
    }

    function load(array){
        array.forEach(x => {
            if(bot.log){
                bot.log(`\n\nLoading ${x.toUpperCase()}!\n`.info);
            }else{
                console.log(`\n\nLoading ${x.toUpperCase()}!\n`.info);
            }
            require(join(__dirname,'loader',x))(bot);
        });
    }

    const priority = [
        "languages",
        "startup",
        "modules",
        "events"
    ];
    load(priority);
    load(
        [
            ...readdirSync(join(__dirname,'loader')).map(v => priority && v.match(bot.supportedFiles).length > 0 && !priority.includes(v.replace(bot.supportedFiles,'')) ? v.replace(bot.supportedFiles,'') : null).clean()
        ]
    )
}
