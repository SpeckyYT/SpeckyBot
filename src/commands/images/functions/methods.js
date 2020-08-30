const { read, MIME_PNG, MIME_JPEG } = require('jimp');

module.exports = async (bot, msg, method, free, values, fileFormat) => {
    let [intensity,min,max] = Array.isArray(values) ? values : [];
    const { Args } = msg;

    let tempIntensity = Args[0] ? parseInt(Args[0]) : null;

    if(typeof tempIntensity == "number") intensity = tempIntensity.clamp(min,max);

    if(isNaN(intensity) && (free || typeof min == "number" || typeof max == "number")){
        return bot.cmdError(`${intensity} is not a number`);
    }

    const image = bot.cache.lastImage[msg.channel.id];
    if(image == undefined) return bot.cmdError("No image found");

    if(!fileFormat) fileFormat = "png";

    return new Promise((res) => {
        return msg.channel.send("Image is getting processed...")
        .then(response => {
            return read(image, async (err, file) => {
                if(err) return res(bot.cmdError("Error happend"));

                async function run(){
                    response.delete().catch(()=>{});
                    return msg.channel.send((await file.getBufferAsync(!fileFormat || fileFormat == 'png' ?  MIME_PNG : MIME_JPEG)).toAttachment(`image.${fileFormat||'png'}`))
                    .then(async (ree) => {
                        return res(bot.cache.lastImage[msg.channel.id] = ree.attachments.first().proxyURL);
                    });
                }

                if(!method){
                }else if(typeof intensity == "boolean" && typeof min == "boolean" && typeof max == "undefined"){
                    file[method](intensity,min);
                }else if(!isNaN(intensity)){
                    file[method](intensity);
                }else{
                    file[method]()
                }
                return run();
            })
        })
    })
}
