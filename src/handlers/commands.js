const { Collection, Permissions } = require('discord.js');

module.exports = (bot) => {
    bot.commands = new Collection();
    bot.aliases = new Collection();

    global.modules.loader(bot, 'commands', ({filePath}) => {
        const pull = bot.require(filePath);

        if(!pull.name){
            throw new Error("Name property of the command not found".toUpperCase());
        }

        if(bot.commands.has(pull.name) || bot.aliases.has(pull.name)){
            throw new Error("Command invocation already exists (name)".toUpperCase());
        }

        if(!Array.isArray(pull.aliases)){
            pull.aliases = [pull.aliases].filter(x=>x);
        }

        if(pull.aliases.some(alias => bot.aliases.has(alias) || bot.commands.has(alias))){
            throw new Error("Command invocation already exists (alias)".toUpperCase());
        }

        if(pull.botPerms) Permissions.resolve(pull.botPerms);
        if(pull.userPerms) Permissions.resolve(pull.userPerms);

        if(pull.template){
            const template = bot.templates[pull.template];
            if(template) pull.templateRun = template(pull.data||{});
        }

        bot.commands.set(pull.name, pull);
        for(let alias of pull.aliases) bot.aliases.set(alias, pull.name);
    })
};
