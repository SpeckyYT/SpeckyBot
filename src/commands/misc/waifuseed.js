module.exports = {
    name: "waifuseed",
    description: "Gives you a waifu by seed!",
    usage: '<number>',
    category: 'misc'
}

module.exports.run = async (bot, msg) => {
    if(!msg.cmdContent) return bot.cmdError('No seed found');

    const seed = parseInt(msg.args[0]);
    if(isNaN(seed)) return bot.cmdError('Seed is not a number');
    if(seed < 0 || seed >= 2**32) return bot.cmdError('Seed is not valid');

    const session = await (new (await import('waifusocket')).default()).login();

    const waifu = Array(17).fill(seed);

    const waifuImg = (await session.genBig(waifu)).image;
    const waifuAtt = waifuImg.toAttachment(`waifu-${seed}.png`);
    return msg.channel.send(waifuAtt);
}
