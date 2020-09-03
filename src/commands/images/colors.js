module.exports = {
    name: "colors",
    description: "Shows you the colors used in the image!",
    category: "images",
    aliases: ["colours"]
}

const jimp = require('jimp');
const cc = require('color-convert');
const Canvas = require('canvas');

module.exports.run = async (bot, msg) => {
    const image = bot.cache.lastImage[msg.channel.id];
    if(image == undefined) return bot.cmdError("No image found");

    const allColors = [];

    await new Promise((res,rej) => {
        jimp.read(image,(err,image) => {
            if(err) rej(err);
            let e = Math.ceil(image.getWidth()/512);
            let f = Math.ceil(image.getHeight()/512);
            if(e < 1) e = 1; if(f < 1) f = 1;
            for(let x = 0; x < image.getWidth(); x+=e){
                for(let y = 0; y < image.getHeight(); y+=f){
                    image.getPixelColor(x,y,(err,rgb) => {
                        const pixel = cc.hex.hsv(rgb.toString(16));
                        if(!isNaN(pixel[0]) && pixel[1] > 15 && pixel[2] > 15 && Math.abs(pixel[0] - pixel[1]) > 15){
                            allColors.push(pixel[0]);
                        }
                    })
                }
            }
            res()
        })
    });

    const group = allColors.group();
    const hsv = Array(360).fill(0);

    group.toCollection()
    .forEach((v,k) => {
        hsv[k] = v;
    })

    let max = Math.max(...hsv);
    const canvas = Canvas.createCanvas(360,750);
    const ctx = canvas.getContext('2d');
    const rainbow = 200;
    ctx.fillStyle = "rgb(0,0,0)"
    ctx.fillRect(0,0,canvas.width,canvas.height);
    for(let i = 0; i < 359; i++){
        const c = hsv[i];
        const b = c?(c/max)*(canvas.height-rainbow):0;
        ctx.fillStyle = "rgb(255,255,255)"
        ctx.fillRect(i,canvas.height,1,-b);
        ctx.fillStyle = `hsl(${i},100%,50%)`
        ctx.fillRect(i,0,1,rainbow);
    }
    return msg.channel.send(canvas.toBuffer().toAttachment('colors.png'));
}
