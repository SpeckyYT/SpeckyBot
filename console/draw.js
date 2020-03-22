module.exports = {
    name: 'draw',
    aliases: []
}

module.exports.run = async (bot, args) => {
    bot.cache.console.drawlink = args.join('');
    require('./functions/drawbuffer')(args.join(''));
}
