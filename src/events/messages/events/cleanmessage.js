module.exports = {
    event: 'filteredMessage'
}

module.exports.call = async (bot, msg) => {
    const filterSettings = [
        'global',
    ];
    if(filterSettings.some(s => msg.channel.topicSetting(s))) return;

    return bot.emit('cleanMessage', msg);
}
