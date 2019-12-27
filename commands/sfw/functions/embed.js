const { RichEmbed } = require('discord.js')
const client = require('nekos.life');
const neko = new client();

module.exports = async (method, msg) => {
    neko.sfw[method]().then(imgURL => {
        let embed = new RichEmbed()
        .setImage(imgURL.url)
        .setColor('FF00AA')
        msg.channel.send(embed)
    })
}