module.exports = {
    event: "globalMessageDelete"
}

module.exports.call = async (bot, msg) => {
    const am = bot.cache.globalchat.get(msg.id);
    if(am) for(const ms of am) await ms.delete().catch(()=>{});
    bot.cache.globalchat.delete(msg.id);
}
