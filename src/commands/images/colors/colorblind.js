module.exports = {
    name: "colorblind",
    description: "Filters the image with a colorblind filter!",
    usage: "<achromatopsia|deuteranopia|protanopia|tritanopia>",
    category: "images",
    aliases: ["colourblind","colorblindness","colourblindness"]
}

const { simulate } = require('@bjornlu/colorblind');
const jimp = require('jimp');

module.exports.run = async (bot, msg) => {
    const filters = ["achromatopsia","deuteranopia","protanopia","tritanopia"];
    const filter = msg.args[0];
    if(!filters.includes(filter)){
        return bot.cmdError(`Invalid colorblind filter, available ones: ${filters.join(' ')}`)
    }

    const image = bot.cache.lastImage[msg.channel.id];
    if(image == undefined) return bot.cmdError("No image found");

    new Promise((res,rej) =>
        jimp.read(image, (err, image) => {
            image.getWidth().repeat(x => {
                image.getHeight().repeat(y => {
                    jimp.intToRGBA(image.getPixelColor(x,y), (err, rgba) =>{
                        let {r,g,b} = simulate(rgba,filter);
                        r = Math.floor(r).clamp(0,255);
                        g = Math.floor(g).clamp(0,255);
                        b = Math.floor(b).clamp(0,255);
                        image.setPixelColor(jimp.rgbaToInt(r,g,b,rgba.a),x,y);
                        if(x+1 >= image.getWidth() && y+1 >= image.getHeight()){
                            return image.getBufferAsync(jimp.MIME_PNG)
                            .then(buffer => {
                                res(msg.channel.send(buffer.toAttachment('image.png')))
                            })
                        }
                    })
                })
            })
        })
    )
}
