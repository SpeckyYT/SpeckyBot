const { read } = require('jimp')
const { unlink } = require('fs')

module.exports = async (bot, msg, method, free, [val, min, max],fileFormat) => {
    let { args } = msg;

    let intensity = val;

    if(intensity != false){

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

    }else{
        intensity = null;
    }

    let image    = bot.cache.lastImage[msg.channel.id]; 
    let id       = bot.snowflake.nextId();

    if(image == undefined){ msg.channel.send("No image found"); return; }

    msg.channel.send("Image is getting processed...").then( response => {

        read(image, (err, file) => {
            if (err){ msg.channel.send("Error happend") };

            function run(){
                msg.channel.send( '',  { files: [id + `.${fileFormat}`] }).then((ree)=>{
                    response.delete();
                    unlink("./" + id + `.${fileFormat}`, () => {})
                    bot.cache.lastImage[msg.channel.id] = ree.attachments.first().proxyURL;
                })
            }

            if(intensity != null){
                file[method](intensity).write(id + `.${fileFormat}`, ()=>{
                    run();
                })
            }else{
                file[method]().write(id + `.${fileFormat}`, ()=>{
                    run();
                })
            }
        })
    })
}
