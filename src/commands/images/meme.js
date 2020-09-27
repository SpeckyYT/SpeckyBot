module.exports = {
    name: "meme",
    description: "Creates a top-text/bottom-text meme!",
    usage: '<top-text>|<bottom-text>',
    category: "images"
}

const Canvas = require('canvas');
const { join } = require('path');
const { save } = require(join(process.cwd(),'modules','assets'));

const promises = [
    ["https://www.wfonts.com/download/data/2014/05/29/impact/impact.ttf",'impact.ttf']
].map(save);

Promise.all(promises)
.then(()=>Canvas.registerFont(join(process.cwd(),'assets','impact.ttf'),{family: 'Impact'}))
.catch(()=>{});

module.exports.run = async (bot, msg) => {
    await Promise.all(promises);

    const image = bot.cache.lastImage[msg.channel.id];
    if(image == undefined) return bot.cmdError("No image found");

    const img = await Canvas.loadImage(image);
    const { height, width } = img;

    const canvas = Canvas.createCanvas(width, height);
    const ctx = canvas.getContext('2d');

    ctx.font = `${Math.ceil(height/10)}px Arial`;
    ctx.fillStyle = "rgb(255,255,255)";
    ctx.strokeStyle = "rgb(0,0,0)";
    ctx.lineWidth = Math.ceil(height/10/5);
    ctx.textAlign = 'center'

    const [top,bottom] = msg.cmdContent.split('|').map(s=>s.trim());

    ctx.drawImage(img,0,0);
    [
        [top||'top text',width/2,Math.ceil(height/10),width],
        [bottom||'bottom text',width/2,height-(height/10/3),width]
    ]
    .forEach(([t,...p]) => ctx.strokeText(t.toUpperCase(),...p) || ctx.fillText(t.toUpperCase(),...p));

    return msg.channel.send(
        canvas.toBuffer('image/jpeg',{quality:0.25}).toAttachment('meme.jpg')
    )
}
