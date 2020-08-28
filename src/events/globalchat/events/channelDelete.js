module.exports = {
    event: "channelDelete"
}

module.exports.call = async (bot, channel) => {
    try{
        if(channel.topicSetting('global')) return bot.emit('globalChatRemoved', channel);
    }catch(err){}
}
