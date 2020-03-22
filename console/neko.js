module.exports = {
    name: 'neko',
    aliases: ['nyan','nya']
}

const { neko } = new (require('nekos.life'))().sfw;

module.exports.run = async (bot, args) => {
    await neko().then(async img => {
        bot.cache.console.drawlink = img.url;
        require('./functions/drawbuffer')(img.url)
    })
}
