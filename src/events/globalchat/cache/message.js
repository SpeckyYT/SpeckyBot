module.exports = {
    event: 'globalMessage',
    run: (bot, msg) => bot.cache.gcmessages.set(msg.id, msg)
}
