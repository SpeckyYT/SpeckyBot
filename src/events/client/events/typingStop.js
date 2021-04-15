module.exports = {
    event: "typingStart"
}

module.exports.run = async (bot, channel, user) => {
    await Promise.race(
        [
            channel.awaitMessages(m => m.author.id == user.id, {max: 1}),
            new Promise(res => bot.setTimeout(res,10000))
        ]
    )
    bot.emit('typingStop', channel, user);
}
