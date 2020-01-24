module.exports.run = (bot, args) => {
    bot.cache.console.guild = args[0];
}

module.exports = {
    name: 'searchserver',
    aliases: ['searchguild','sg','ss']
}