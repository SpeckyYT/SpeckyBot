const { read, MIME_PNG, MIME_JPEG } = require('jimp');

module.exports.images = ({method, free, values, percent, fileFormat}) =>
    function(bot, msg){
        const [def,min,max] = Array.isArray(values) ? values : [];

        let intensity = msg.Args[0] ? parseInt(msg.Args[0]) : def;
        if(isNaN(intensity)) intensity = def;
        if(typeof intensity == "number") intensity = intensity.clamp(min,max);
        if(percent) intensity = intensity / 100;

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
                        .then((ree) => res(bot.cache.lastImage[msg.channel.id] = ree.attachments.first().proxyURL));
                    }

                    if(method){
                        if(typeof intensity == "boolean" && typeof min == "boolean" && typeof max == "undefined"){
                            file[method](intensity,min); // for flip and flop
                        }else if(!isNaN(intensity)){
                            file[method](intensity);
                        }else{
                            file[method]()
                        }
                    }
                    return run();
                })
            })
        })
    }
