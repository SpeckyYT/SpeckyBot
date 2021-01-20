module.exports = {
    name: "droppedthis",
    description: "You dropped this",
    usage: "[text]",
    category: "memes",
    aliases: ['dropped','youdroppedthis','udroppedthis']
}

const Canvas = require('canvas');
const save = global.modules.saveAsset;

const promise = save("https://i.imgflip.com/3w1q71.jpg",'droppedthis.jpg')

module.exports.run = async (bot, msg) => {
    await promise;

    const canvas = Canvas.createCanvas(500,523);
    const ctx = canvas.getContext('2d');

    let { droppedthis } = this;
    if(!droppedthis) droppedthis = await Canvas.loadImage(global.assets.droppedthis);

    ctx.drawImage(droppedthis,0,0);

    ctx.fillStyle = "#2C2F33";
    ctx.fillRect(132,282,142,78);

    const channel = msg.mentions.channels.first()
    const text = (channel && channel.name || msg.cmdContent.trim() || msg.guild.channels.cache.filter(c => c.type == 'text').random().name).toLowerCase();

    ctx.font = "35px sans-serif";
    ctx.fillStyle = "rgb(255,255,255)";
    ctx.fillText(text,133,333,135);

    return msg.channel.send(canvas.toBuffer('image/jpeg', {quality: 0.75}).toAttachment('droppedthis.jpg'));
}
