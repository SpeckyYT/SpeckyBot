module.exports.run = (bot, args) => {
    bot.cache.console.channel = args[0];
}

module.exports = {
    name: 'searchchannel',
    aliases: ['sc']
}