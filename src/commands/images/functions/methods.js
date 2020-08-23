const { read } = require('jimp')
const { unlink } = require('fs')

module.exports = async (bot, msg, method, free, values,fileFormat) => {
    const { Args } = msg;

    let intensity,min,max;
    if(typeof values == "object"){
        intensity = values[0];
        min = values[1];
        max = values[2];
    }

    Args[0] = parseFloat(Args[0])

    if(typeof intensity != "boolean"){

        if(!free){
            if(!isNaN(Args[0])){
                intensity = Number(Args[0]);
            }
            if(intensity > max){
                intensity = max
            }
            if(intensity < min){
                intensity = min
            }
        }else{
            intensity = Number(Args[0])
        }
    }else{
        intensity = null;
    }

    const image    = bot.cache.lastImage[msg.channel.id];
    const id       = bot.snowflake();

    if(image == undefined){
        return await msg.channel.send("No image found");
    }

    if(!fileFormat){
        fileFormat = "png"
    }

    let error;

    return await msg.channel.send("Image is getting processed...").then( response => {

        return read(image, async (err, file) => {
            if (err){
                return bot.cmdError("Error happend");
            }

            async function run(){
                msg.channel.send( '',  { files: [id + `.${fileFormat}`] })
                .catch((err) => {
                    error = new Promise((res,rej) => rej(err));
                })
                .then(async (ree)=>{
                    await response.delete();
                    unlink(`.\\${id}.${fileFormat}`, () => {});
                    if(!error){
                        bot.cache.lastImage[msg.channel.id] = ree.attachments.first().proxyURL;
                    }
                });
            }

            if(intensity != null){
                file[method](intensity);
                file.autocrop().write(id + `.${fileFormat}`, ()=>{
                    return run();
                })
            }else{
                file[method]();
                file.autocrop().write(id + `.${fileFormat}`, ()=>{
                    return run();
                })
            }
        })
    })
}
