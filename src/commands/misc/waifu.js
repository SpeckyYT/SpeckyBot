module.exports = {
    name: "waifu",
    description: "Gives you a waifu!",
    category: 'misc',
    aliases: ['w']
}

const waifulabs = new (require('waifulabs'))();

module.exports.run = async (bot, msg) => {
    const waifu = [];
    (16).repeat(() => waifu.push(Math.floor(Math.random()*2**16)));
    waifu.push(0);
    waifu.push([
        Math.random()*255,
        Math.random()*255,
        Math.random()*255
    ]);
    const waifuBig = (await waifulabs.generateBigWaifu(waifu)).image;
    const waifuImg = Buffer.from(waifuBig, 'base64');
    const waifuAtt = waifuImg.toAttachment('waifu.png');
    return msg.channel.send(waifuAtt);
}
