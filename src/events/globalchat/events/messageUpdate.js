module.exports = {
    event: "messageUpdate"
}

module.exports.call = async (bot, _, msg) => {
    if(msg.author.bot) return;
    if(msg.system) return;
    await Promise.all(bot.cache.globalchatsent).catch(()=>{});
    if(msg.channel.topicSetting('global')){
        bot.emit('globalMessageUpdate', _, msg);
    }
}
