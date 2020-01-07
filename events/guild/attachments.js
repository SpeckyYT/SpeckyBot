module.exports = async (bot, msg) => {
    bot.setLastImageCache(msg)
}

module.exports.config = {
    event: "message"
}
