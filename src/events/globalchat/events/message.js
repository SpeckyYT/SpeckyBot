module.exports = {
    event: "filteredMessage"
}

module.exports.call = async (bot, msg) => {
    if(!msg.channel.topicSetting('global')) return;
    if(!bot.globalchats.has(msg.channel.id)) return;

    const react = e => msg.react(e).catch(()=>{});

    // Consecutive Messages
    const consecutiveCount = 2;
    const prevMessages = bot.cache.gcmessages.last(consecutiveCount);
    if(prevMessages && prevMessages.length >= consecutiveCount)
        if(prevMessages.every(m => m.author.id == msg.author.id))
            return react(bot.emotes.notwice);

    // Too big Messages
    if(msg.content.split('\n').length > 15)
        return react(bot.emotes.toolong);

    // External Emotes
    const emotes = msg.content.match(bot.regex.emote);
    if(Array.isArray(emotes))
        if(emotes.map(e => e.match(bot.regex.id)[0]).some(e => !bot.emojis.cache.has(e)))
            return react(bot.emotes.noexternal);

    bot.emit('globalMessage', msg);
}
