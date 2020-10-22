module.exports = {
    event: "globalMessage"
}

module.exports.call = async (bot, msg) => {
    const check = (c) => c.topic ? c.topic.toLowerCase().includes('[global]') : false;
    bot.channels.cache.filter(chan => check(chan) && msg.channel.id != chan.id)
    .forEach(chan => {
        bot.cache.globalchatsent.push(
            chan.send(bot.globalChatEmbed(msg))
            .then(m => {
                if(bot.cache.globalchat.has(msg.id)){
                    bot.cache.globalchat.set(msg.id,[...bot.cache.globalchat.get(msg.id).push(m)]);
                }else{
                    bot.cache.globalchat.set(msg.id,[msg,m]);
                }
            })
            .catch(()=>{})
        )
    })
}
