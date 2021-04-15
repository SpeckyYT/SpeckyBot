module.exports = {
    name: "screenshot",
    description: "Screenshots a website!",
    usage: "<link>",
    category: "misc",
    aliases: ['ss']
}

const webshot = require('node-webshot');
const options = {
    windowSize: {
        width: 1920,
        height: 1080
    },
    quality: 100,
    renderDelay: 1000,
    streamType: 'png'
}

module.exports.run = async (bot, msg) => {
    if(!msg.cmdContent) return bot.cmdError('No link found');

    const stream = webshot(msg.cmdContent,options);

    const image = await stream.toBuffer();

    return msg.channel.send(image.toAttachment('screenshot.png'))
}
