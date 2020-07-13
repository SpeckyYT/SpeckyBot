const { RichEmbed } = require('discord.js');
const { nsfw } = new (require('nekos.life'))();

module.exports = async (method, msg) => {
    if(Array.isArray(method)){
        method = method.pick();
    }
    
    let url = '';

    await nsfw[method]()
    .then(img => {
        url = img.url;
    })
    .catch(()=>{});

    if(!url){
        return msg.channel.send("An unexpected error happened");
    }

    const embed = new RichEmbed()
    .setImage(url);

    return msg.channel.send(embed); 
}
