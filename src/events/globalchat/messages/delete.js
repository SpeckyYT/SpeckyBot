module.exports = {
    event: "messageDelete"
}

module.exports.call = async (bot, msg) => {
    if(msg.author.bot) return;
    const check = (c) => c.topic ? c.topic.toLowerCase().includes('[global]') : false
    if(check(msg.channel)){
        const am = bot.cache.globalchat.get(msg.id);
        if(am){
            am.forEach(ms => ms.delete().catch(()=>{}));
        }
        bot.cache.globalchat.delete(msg.id);
    }
}
