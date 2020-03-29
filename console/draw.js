module.exports = {
    name: 'draw',
    aliases: []
}

module.exports.run = async (bot, data) => {
    return require('./functions/drawbuffer')(bot,data.contento)
    .catch(() => {
        return bot.cmdError(`${data.content.length > 2 ? data.content.bgRed : "undefined".bgRed} is not a valid image link`.yellow)
    })
}
