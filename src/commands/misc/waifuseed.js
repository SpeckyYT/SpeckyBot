module.exports = {
    name: "waifuseed",
    description: "Gives you a waifu by seed!",
    usage: '<number>',
    category: 'misc'
}

const waifulabs = require('waifulabs');

module.exports.run = async (bot, msg) => {
    if(!msg.cmdContent) return bot.cmdError('No seed found');

    const seed = parseInt(msg.args[0]);
    if(isNaN(seed)) return bot.cmdError('Seed is not a number');

    const waifu = Array(17).fill(seed);
    if(!waifulabs.isValidSeed(waifu)) return bot.cmdError('Seed is not valid');

    const waifuBig = (await waifulabs.generateBigWaifu(waifu)).image;
    const waifuImg = Buffer.from(waifuBig, 'base64');
    const waifuAtt = waifuImg.toAttachment(`waifu${seed}.png`);
    return msg.channel.send(waifuAtt);
}
