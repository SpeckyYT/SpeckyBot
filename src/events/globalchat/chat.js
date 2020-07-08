module.exports = {
    event: "message"
}

module.exports.call = async (bot, msg) => {
    if(msg.author.bot) return;
    const check = (c) => c.topic ? c.topic.toLowerCase().includes('[global]') : false
    if(check(msg.channel)){
        bot.channels.filter(chan => check(chan) && msg.channel.id != chan.id).forEach(async chan => {
            chan.send(bot.globalChatEmbed(msg))
            .then(m => {
                if(bot.cache.globalchat.has(msg.id)){
                    bot.cache.globalchat.set(msg.id,[...bot.cache.globalchat.get(msg.id).push(m)]);
                }else{
                    bot.cache.globalchat.set(msg.id,[m]);
                }
            })
            .catch(()=>{});
        })
    } 
}
