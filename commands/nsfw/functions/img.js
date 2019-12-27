const { RichEmbed } = require('discord.js')
const client = require('nekos.life');
const { nsfw } = new client();

module.exports = async (method, msg) => {
    nsfw[method]().then(async imgURL => {
        if(!imgURL.includes('/404.png')){
            let embed = new RichEmbed()
            .setImage(imgURL.url)
            .setColor('FF00AA');
            return msg.channel.send(embed);
        }   
    })
}