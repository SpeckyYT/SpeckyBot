module.exports = {
    name: 'uptime',
    aliases: []
}

module.exports.run = async (bot, data) => {
    console.log(bot.formatTime(bot.uptime).cli)
}
