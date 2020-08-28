module.exports = {
    event: 'globalChatRemoved'
}

module.exports.call = (bot,channel) => {
    bot.globalchats.delete(channel.id, channel);
}
