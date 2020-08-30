module.exports = {
    event: "ready"
}

module.exports.call = (bot) => {
    bot.channels.filter(c => c.topicSetting('global'))
    .forEach((v,i) => {
        bot.globalchats.set(i,v);
    });
}
