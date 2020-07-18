module.exports = {
    name: "waifus",
    description: "Gives you waifus to choose from!",
    usage: '',
    category: 'misc',
    aliases: ['ws']
}

const waifulabs = new (require('waifulabs'))();
const Canvas = require('canvas');
const { Attachment } = require('discord.js');

const waifuSize = 200;

module.exports.run = async (bot, msg) => {
    const canvas = Canvas.createCanvas(waifuSize*4, waifuSize*4);
    const waifuCanvas = canvas.getContext("2d", {alpha: false});

    await waifulabs.generateWaifus()
    .then(waifus => {
        return waifus.forEach((w,i) => {
            Canvas.loadImage(Buffer.from(w.image, 'base64'))
            .then(img => waifuCanvas.drawImage(img, (i%4)*waifuSize, Math.floor(i/4)*waifuSize))
        })
    })

    return msg.channel.send(new Attachment(canvas.toBuffer()));
}
