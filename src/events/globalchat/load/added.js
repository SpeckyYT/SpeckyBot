module.exports = {
    event: 'globalChatAdded'
}

module.exports.call = (bot,channel) => {
    bot.globalchats.set(channel.id, channel);
}
