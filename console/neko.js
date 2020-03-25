module.exports = {
    name: 'neko',
    aliases: ['nyan','nya']
}

const func = new (require('nekos.life'))().sfw['neko'];

module.exports.run = async (bot, args) => {
    await func().then(async img => {
        bot.cache.console.drawlink = img.url;
        require('./functions/drawbuffer')(img.url)
    })
}
