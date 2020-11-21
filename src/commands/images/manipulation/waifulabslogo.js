module.exports = {
    name: "waifulabslogo",
    description: "Applies the WaifuLabs Logo to the image!",
    category: "images",
    aliases: ['wll']
}

const url = require("url");
const path = require("path");
const Canvas = require('canvas');
const save = global.modules.saveAsset;

const promises = [
    ["https://i.imgur.com/3A27Ron.png",'wll.png']
].map(save);

module.exports.run = async (bot,msg) => {
    await promises;

    const image = bot.cache.lastImage[msg.channel.id];
    if(image == undefined) return bot.cmdError("No image found");

    let { logo } = this;
    if(!logo) logo = await Canvas.loadImage(global.assets.wll);
    const img = await Canvas.loadImage(image);

    const canvas = Canvas.createCanvas(img.width,img.height);
    const ctx = canvas.getContext('2d');

    const size = 0.21;

    const sq = Math.min(img.width,img.height);

    ctx.drawImage(img, 0, 0);
    ctx.drawImage(logo, 0, img.height - (sq * size), sq*size, sq*size);

    return msg.channel.send(canvas.toBuffer().toAttachment(path.basename(url.parse(image).pathname)));
}
