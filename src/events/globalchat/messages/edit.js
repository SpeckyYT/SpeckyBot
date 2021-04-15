module.exports = {
    event: "globalMessageUpdate"
}

module.exports.call = async (bot, _, msg) => {
    const am = bot.cache.globalchat.get(msg.id);
    msg.content = bot.globalChatCensor(msg.content);
    if(am) am.forEach(ms => ms.edit(bot.globalChatEmbed(msg)).catch(()=>{}))
}
