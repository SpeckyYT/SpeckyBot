module.exports = {
    event: "globalMessageDelete"
}

module.exports.call = async (bot, msg) => {
    const am = bot.cache.globalchat.get(msg.id);
    if(am) am.forEach(ms => ms.delete().catch(()=>{}));
    bot.cache.globalchat.delete(msg.id);
}
