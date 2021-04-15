module.exports = {
    name: "yeet",
    description: "Yeets your problems",
    usage: "<text>",
    category: "memes",
}

const Canvas = require('canvas');
const save = global.modules.saveAsset;

const promise = save("https://i.imgflip.com/3att2n.jpg",'yeet.jpg');

module.exports.run = async (bot, msg) => {
    await promise;

    const canvas = Canvas.createCanvas(543,393);
    const ctx = canvas.getContext('2d');

    let { yeet } = this;
    if(!yeet) yeet = await Canvas.loadImage(global.assets.yeet);

    ctx.drawImage(yeet,0,0);

    const examples = [
        "My child",
        "My life",
        "My anxiety",
        "School",
        "Python",
    ];

    ctx.fillStyle = '#000000';

    ctx.textAlign = 'center';
    ctx.font = '46px Arial';
    ctx.fillText('Me',430,370,150);

    ctx.textAlign = 'left';
    ctx.font = '32px Arial';
    ctx.fillText(msg.cmdContent || examples.pick(),35,40,460);

    return msg.channel.send(canvas.toBuffer().toAttachment('yeet.png'));
}
