module.exports = {
    event: 'filteredMessage'
}

module.exports.call = async (bot, msg) => {
    if(!msg.author.id.isOwner()){
        if(msg.channel.topicSetting('global')) return;
    }

    return bot.emit('cleanMessage', msg);
}
