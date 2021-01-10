module.exports = (bot) => {
    bot.emotes = {}

    global.modules.loader(bot, 'emotes', ({filePath}) => {
        const emojis = bot.require(filePath);
        if(!emojis) return;
        const values = Object.values(emojis);
        Object.keys(emojis)
        .forEach((name,index) => {
            if(bot.emotes[name]) throw new Error(`Emote ${name} already exists`);
            const emojiID = values[index].match(bot.regex.id);
            const emoji = emojiID ? bot.emojis.cache.get(emojiID[0]) : null;
            if(emoji){
                bot.emotes[name] = emoji;
            }else{
                bot.emotes[name] = values[index];
            }
        })
    })
};
