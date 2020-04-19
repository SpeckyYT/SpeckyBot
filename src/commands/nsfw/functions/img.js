const { RichEmbed } = require('discord.js');
const { nsfw } = new (require('nekos.life'))();
const { imageEndpoint } = new (require('nekobot-api').NekoBot)();

module.exports = async (method, msg) => {
    if(Array.isArray(method)){
        method = method.pick();
    }
    
    let url = '';

    if(nsfw[method]){
        await nsfw[method]()
        .then(img => {
            url = img.url;
        })
        .catch(()=>{});
    }else{
        await imageEndpoint.getImage(method)
        .then(img => {
            url = img;
        })
        .catch(()=>{});
    }

    if(!url){
        return msg.channel.send("An unexpected error happened");
    }

    let embed = new RichEmbed()
    .setImage(url)
    .setColor('FF00AA');

    return msg.channel.send(embed); 
}