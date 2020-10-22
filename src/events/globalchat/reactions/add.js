module.exports = {
    event: "messageReactionAdd"
}

module.exports.call = async (bot, reaction, user) => {
    await Promise.all(bot.cache.globalchatsent).catch(()=>{});
    if(bot.globalchats.has(reaction.message.channel.id)){
        if(!(reaction.emoji.id === null || bot.emojis.cache.has(reaction.emoji.id))) reaction.removeAll().catch(()=>{});
        if(user.bot) return;
        const am = bot.cache.globalchat.get(reaction.message.id) || bot.cache.globalchat.find(ma => ma.find(m => m.id === reaction.message.id));
        if(am){
            am.forEach(ms => ms.react(reaction.emoji).catch(()=>{}));
        }
    }
}
