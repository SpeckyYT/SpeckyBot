module.exports = {
    event: "messageReactionAdd"
}

module.exports.call = async (bot, reaction, user) => {
    const check = (c) => c.topic ? c.topic.toLowerCase().includes('[global]') : false;
    if(check(reaction.message.channel)){
        if(!(reaction.emoji.id === null || bot.emojis.has(reaction.emoji.id))) reaction.removeAll().catch(()=>{});
        if(user.bot && user.id !== bot.user.id) return;
        const am = bot.cache.globalchat.get(reaction.message.id) || bot.cache.globalchat.find(ma => ma.find(m => m.id === reaction.message.id));
        if(am){
            am.forEach(ms => ms.react(reaction.emoji).catch(()=>{}));
        }
    }
}
