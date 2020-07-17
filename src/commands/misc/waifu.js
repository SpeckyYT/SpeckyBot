module.exports = {
    name: "waifu",
    description: "Gives you a waifu!",
    usage: '',
    category: 'misc',
    aliases: ['w','waifulabs']
}

const { Attachment } = require('discord.js');
const client = require('waifulabs');
const waifulabs = new client();

module.exports.run = async (bot, msg) => {
    const waifu = (await waifulabs.generateWaifus()).pick();
    const waifuBig = (await waifulabs.generateBigWaifu(waifu)).image;
    const waifuImg = Buffer.from(waifuBig, 'base64');
    const waifuAtt = new Attachment(waifuImg, 'waifu.png');

    return msg.channel.send(waifuAtt);
}
