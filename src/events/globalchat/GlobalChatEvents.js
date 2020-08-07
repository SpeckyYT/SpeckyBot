module.exports = {
    event: "channelUpdate"
}

module.exports.call = async (bot, oldChannel, newChannel) => {
    try{
        if(oldChannel.type !== "text") return;
        if(!oldChannel.topicSetting('global') && newChannel.topicSetting('global')) return bot.emit('globalChatAdded', newChannel);
        if(oldChannel.topicSetting('global') && !newChannel.topicSetting('global')) return bot.emit('globalChatRemoved', newChannel);
    }catch(err){}
}
