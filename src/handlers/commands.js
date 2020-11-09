const { Collection } = require('discord.js');

module.exports = (bot) => {
    bot.commands = new Collection();
    bot.aliases = new Collection();

    global.modules.loader(bot, 'commands', ({filePath}) => {
        const pull = bot.require(filePath);
        if(!pull.name) throw new Error("Name of the command not found!".toUpperCase());
        if(pull.template) {
            const tmplt = bot.templates[pull.template];
            if(tmplt){
                pull[Math.random().toString(36).substring(2, 15) || 'run'] = tmplt(pull.data||{});
            }
        }
        bot.commands.set(pull.name, pull);
        if(Array.isArray(pull.aliases)){
            pull.aliases.forEach(a => bot.aliases.set(a, pull.name));
        }else if(typeof pull.aliases === 'string'){
            bot.aliases.set(pull.aliases, pull.name);
        }
    })
};
