module.exports = (bot) => {
    bot.templates = {}

    global.modules.loader(bot, 'botfunctions', ({filePath}) => {
        const tmplts = bot.require(filePath);
        if(!tmplts) return;
        const values = Object.values(tmplts);
        Object.keys(tmplts)
        .forEach((name,index) => {
            if(bot.templates[name]){
                throw new Error(`Template ${name || 'null'} already exists`);
            }
            bot.templates[name] = values[index];
        })
    })
};
