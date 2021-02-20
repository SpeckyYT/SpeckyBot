module.exports = {
    event: "filteredMessage"
}

module.exports.call = async (bot, msg) => {
    if(!msg.channel.topicSetting('global')) return;
    if(!bot.globalchats.has(msg.channel.id)) return;

    if(!msg.channel.permissionsFor(bot.user).has(bot.perms.globalchat))
        return msg.react('🚷').catch(()=>{});

    const prevMessages = bot.cache.gcmessages.last(2);
    if(prevMessages && prevMessages.length > 1)
        if(prevMessages.every(m => m.author.id == msg.author.id))
            return msg.react('🔄').catch(()=>{});

    if(msg.content.split('\n').length > 20)
        return msg.react('➿').catch(()=>{});

    const emotes = msg.content.match(bot.regex.emote);
    if(emotes && emotes.length)
        if(emotes.some(e => !bot.emojis.cache.has(e)))
            return msg.react('🚳').catch(()=>{});

    bot.emit('globalMessage', msg);
}
