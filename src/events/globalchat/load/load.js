module.exports = {
    event: ['ready','channelUpdate','*/30 * * * *']
}

module.exports.call = (bot) => {
    const servers = [];
    const filter = c =>
        c.topicSetting('global') &&
        !servers.includes((c.guild||{}).id) &&
        (servers.push((c.guild||{}).id), true);
    bot.globalchats = bot.channels.cache.filter(filter);
}
