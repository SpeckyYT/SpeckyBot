module.exports = (bot) => {
    global.modules.loader(bot, 'prototypes', ({filePath}) => bot.require(filePath)(bot))
}
