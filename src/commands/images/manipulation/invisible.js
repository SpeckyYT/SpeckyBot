const colorSchemes = {
    discord: [ 54, 57, 63 ],
    white: [ 255, 255, 255 ],
    black: [ 0, 0, 0 ],
}
const colorSchemesAliases = {
    dark: colorSchemes.discord,
    light: colorSchemes.white,
}
const schemes = Object.assign({},colorSchemes,colorSchemesAliases);

module.exports = {
    name: "invisible",
    description: "Turns your image into an invisible one!",
    category: "images",
    flags: Object.keys(schemes),
    aliases: ['invis'],
}

const Canvas = require('canvas');

const colors = new Map();

const PR = 0.299;
const PG = 0.587;
const PB = 0.114;

function getBrightness(r,g,b){
    const key = `${r}|${g}|${b}`;
    if(colors.has(key)) return colors.get(key);
    const brightness = Math.floor(Math.sqrt(r**2*PR + g**2*PG + b**2*PB));
    colors.set(key,brightness);
    return brightness;
}

module.exports.run = async (bot,msg) => {
    const image = bot.cache.lastImage[msg.channel.id];
    if(image == undefined) return bot.cmdError("No image found");

    const img = await Canvas.loadImage(image);

    const canvas = Canvas.createCanvas(img.width,img.height);
    const ctx = canvas.getContext('2d', { alpha: true });
    ctx.drawImage(img,0,0);

    const scheme = schemes[msg._flags.find(f => schemes[f]) || 'discord'];
    const invert = msg.flag('invert');

    for(let y = 0; y < img.height; y++){
        for(let x = 0; x < img.width; x++){
            const pixel = ctx.getImageData(x,y,1,1);

            const brightness = getBrightness(pixel.data[0],pixel.data[1],pixel.data[2]);

            pixel.data[0] = scheme[0];
            pixel.data[1] = scheme[1];
            pixel.data[2] = scheme[2];
            pixel.data[3] = invert ? Math.abs(brightness-255) : brightness;

            ctx.putImageData(pixel,x,y);
        }
        await bot.async();
    }

    return msg.channel.send(canvas.toBuffer().toAttachment('transparent.png'));
}
