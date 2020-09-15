module.exports = {
    name: "poop",
    description: "Poop!",
    category: "misc",
    aliases: []
}

const size = 1024;
const Canvas = require("canvas");
const { parse } = require('twemoji');

module.exports.run = async (bot,msg) => {
    const canvas = Canvas.createCanvas(size,size);
    const ctx = canvas.getContext('2d',{alpha:true});

    const poop = parse("💩");
    const regex = /<img[^>]+src="?([^"\s]+)"?[^>]*\/>/g;
    const poopURL = regex.exec(poop)[1];

    return Canvas.loadImage(poopURL)
    .then(e => {
        ctx.setTransform(1,0,0,1,-72/2,-72/2);
        for(let y = 0; y < size*4; y++){
            ctx.drawImage(e,Math.floor(Math.random()*size),Math.floor(Math.random()*size));
        }
    })
    .then(() => msg.channel.send(canvas.toBuffer().toAttachment("poop.png")))
}
