module.exports = (bot) => {
    bot.emotes = {}

    global.modules.loader(bot, 'emotes', ({filePath}) => {
        const emojis = bot.require(filePath);
        if(!emojis) return;
        const values = Object.values(emojis);
        Object.keys(emojis)
        .forEach((name,index) => {
            if(bot.emotes[name]) throw new Error(`Emote ${name} already exists`);
            bot.emotes[name] = values[index];
        })
    })
};
