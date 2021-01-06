module.exports = {
    event: "messageDelete"
}

module.exports.call = async (bot, msg) => {
    if(msg.author.bot) return;
    if(msg.system) return;
    await Promise.all(bot.cache.globalchatsent).catch(()=>{});
    if(msg.channel.topicSetting('global')){
        bot.emit('globalMessageDelete', msg);
    }
}
