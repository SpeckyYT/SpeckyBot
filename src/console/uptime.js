module.exports = {
    name: 'uptime'
}

module.exports.run = async (bot, data) => {
    console.log(bot.formatTime(bot.uptime).cli)
}
