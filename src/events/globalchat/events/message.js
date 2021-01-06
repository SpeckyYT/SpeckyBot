module.exports = {
    event: "filteredMessage"
}

module.exports.call = async (bot, msg) => {
    if(msg.channel.topicSetting('global')){
        bot.emit('globalMessage', msg);
    }
}
