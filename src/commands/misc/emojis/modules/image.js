const defaultWidth = 1024;
const defaultHeight = 1024;

const Canvas = require("canvas");
const { parse } = require('twemoji');

module.exports = (emoji, width, height) => {
    width = width || defaultWidth;
    height = height || defaultHeight;

    const canvas = Canvas.createCanvas(width,height);
    const ctx = canvas.getContext('2d',{alpha:true});

    const emojiP = parse(emoji);
    const regex = /<img[^>]+src="?([^"\s]+)"?[^>]*\/>/g;
    const emojiURL = regex.exec(emojiP)[1];

    return Canvas.loadImage(emojiURL)
    .then(e => {
        ctx.setTransform(1,0,0,1,-72/2,-72/2);
        for(let i = 0; i < width*2+height*2; i++){
            ctx.drawImage(e,Math.floor(Math.random()*width),Math.floor(Math.random()*height));
        }
        return canvas.toBuffer();
    })
}
