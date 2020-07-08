module.exports = {
    event: "messageUpdate"
}

module.exports.call = async (bot, _, msg) => {
    if(msg.author.bot) return;
    const check = (c) => c.topic ? c.topic.toLowerCase().includes('[global]') : false
    if(check(msg.channel)){
        const am = bot.cache.globalchat.get(msg.id);
        if(am){
            am.forEach(async ms => ms.edit(bot.globalChatEmbed(msg)))
        }
    } 
}
