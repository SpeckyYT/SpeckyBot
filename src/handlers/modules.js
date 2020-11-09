const { join } = require('path');

module.exports = (bot) => {
    bot.modules = {}
    global.modules = bot.modules;

    (bot.require||require)(join(process.cwd(),'modules','loader'))
    .loader(bot, 'modules', ({filePath})=>{
        const modules = (bot.require||require)(filePath);
        if(!modules) return;
        const values = Object.values(modules);
        Object.keys(modules)
        .forEach((name,index) => {
            if(bot.modules[name]){
                throw new Error(`Module ${name || 'null'} already exists`);
            }
            bot.modules[name] = values[index];
        })
    })
};
