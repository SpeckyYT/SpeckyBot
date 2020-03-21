module.exports = {
    name: 'neko',
    aliases: ['nyan','nya']
}

const { neko } = new (require('nekos.life'))().sfw;
const terminalImage = require('terminal-image');
const got = require('got');

module.exports.run = async (bot, args) => {
    neko().then(async img => {
        const {body} = await got(img.url, {responseType: 'buffer'});
        console.log(await terminalImage.buffer(body));
    })
}
