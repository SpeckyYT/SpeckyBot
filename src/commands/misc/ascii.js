const { font } = require('ascii-art');
const { promisify } = require('util');
const ascii = promisify(font);

module.exports = {
    name: 'ascii',
    description: 'Converts your text to an awesome ascii text',
    category: "misc",
    usage: '<text>'
}

module.exports.run = async (bot, msg) => {
    if(!msg.cmdContent) return bot.cmdError('No text found');

    const res = await ascii(msg.cmdContent,'Doom');

    return msg.channel.send(res.code());
}
