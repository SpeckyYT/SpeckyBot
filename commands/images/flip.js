const { read } = require('jimp')
const { unlink } = require('fs')

module.exports.run = async (bot, msg) => {
    let image    = bot.cache.lastImage[msg.channel.id]; 
    let id       = bot.snowflake.nextId();

    let fileFormat = "png"
    let method = "flip"
    
    if(image == undefined){ msg.channel.send("No image found"); return; }

    msg.channel.send("Image is getting processed...").then( response => {

        read(image, (err, file) => {
            if (err){ msg.channel.send("Error happend") };

            file[method](true, false).write(id + `.${fileFormat}`, ()=>{
                msg.channel.send( '',  { files: [id + `.${fileFormat}`] }).then((ree)=>{
                    response.delete();
                    unlink("./" + id + `.${fileFormat}`, () => {})
                    bot.cache.lastImage[msg.channel.id] = ree.attachments.first().proxyURL;
                })
            })
        })
    })
}

module.exports.config = {
    name: "flip",
	description: "Flips the image! (Horizontally)",
    usage: ``,
    category: `images`,
	accessableby: "Members",
    aliases: [],
    perms: [],
    cmdperms: []
}
