module.exports = {
    event: "channelCreate"
}

module.exports.call = async (bot, channel) => {
    try{
        if(channel.topicSetting('global')) return bot.emit('globalChatAdded', channel);
    }catch(err){}
}
