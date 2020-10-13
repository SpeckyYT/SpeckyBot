module.exports = {
    name: "waifu",
    description: "Gives you a waifu!",
    category: 'misc',
    aliases: ['w']
}

const waifulabs = require('waifulabs');

module.exports.run = async (bot, msg) => {
    const waifu = [];
    for(let i=0;i<16;i++) waifu.push(Math.floor(Math.random()*2**32));
    waifu.push(0,[0,0,0]);
    const waifuBig = (await waifulabs.generateBigWaifu(waifu)).image;
    const waifuImg = Buffer.from(waifuBig, 'base64');
    const waifuAtt = waifuImg.toAttachment('waifu.png');
    return msg.channel.send(waifuAtt);
}
