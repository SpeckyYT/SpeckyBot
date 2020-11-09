module.exports = (bot) => {
    global.modules.loader(bot, 'botfunctions', ({filePath}) => (bot.require||require)(filePath)(bot))
}
