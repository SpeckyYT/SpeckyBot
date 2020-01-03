const Jimp = require('jimp')
const fs = require('fs')

module.exports.run = async (bot, msg) => {
    let { args } = bot;
    var image    = bot.cache.lastImage[msg.author.id]; 
    var id       = bot.snowflake.nextId();

    var intensity = 5;

    if(!isNaN(args[0]))
        intensity = Number(args[0]);

    if(intensity > 50)
        intensity = 50

    if(intensity < 2)
        intensity = 2

    if(image == undefined){ msg.channel.send(bot.L(config, 'imageCommands', 'noImage' )); return; }

    if(msg.channel.type != "dm"){ if(!msg.channel.permissionsFor(msg.guild.me).has('ATTACH_FILES')) { msg.channel.send( "Error" ); return; } }

    msg.channel.send( bot.L(config, 'imageCommands', 'processingImage') ).then( response =>{

        Jimp.read(image, function (err, file) {
            if (err){ msg.channel.send( bot.L(config, 'shared', 'errorGeneric')  ) };

            file.blur(intensity).write(id + ".png", ()=>{
                msg.channel.send( '',  { files: [id + ".png"] }).then((ree)=>{
                    response.delete();
                    fs.unlink("./" + id + ".png", ()=>{})
                    bot.cache.lastImage[msg.author.id] = ree.attachments.first().url;
                })
            })

        })
    })

}

module.exports.config = {
    name: "blur",
	description: "Blurs the image!",
    usage: `[Amount]`,
    category: `images`,
	accessableby: "Members",
    aliases: [],
    perms: []
}