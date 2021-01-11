module.exports = {
    event: ['ready','channelUpdate','*/30 * * * *']
}

module.exports.call = (bot) => {
    const filter = c =>
        c.topicSetting('global');

    bot.globalchats = bot.channels.cache.filter(filter);
}
