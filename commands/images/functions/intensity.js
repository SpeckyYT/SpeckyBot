const { read } = require('jimp')
const { unlink } = require('fs')

module.exports = async (bot, msg, method, free, [val, min, max],fileFormat) => {
    let { args } = msg;

    let intensity = val;

    if(!free){
        if(!isNaN(args[0])){
            intensity = Number(args[0]);
        }
        if(intensity > max){
            intensity = max
        }
        if(intensity < min){
            intensity = min
        }
    }else{
        intensity = Number(args[0])
    }

    let image    = bot.cache.lastImage[msg.author.id]; 
    let id       = bot.snowflake.nextId();

    if(image == undefined){ msg.channel.send("No image found"); return; }

    msg.channel.send("Image is getting processed...").then( response => {

        read(image, (err, file) => {
            if (err){ msg.channel.send("Error happend") };

            file[method](intensity).write(id + `.${fileFormat}`, ()=>{
                msg.channel.send( '',  { files: [id + `.${fileFormat}`] }).then((ree)=>{
                    response.delete();
                    unlink("./" + id + `.${fileFormat}`, () => {})
                    bot.cache.lastImage[msg.author.id] = ree.attachments.first().proxyURL;
                })
            })

        })
    })
}
