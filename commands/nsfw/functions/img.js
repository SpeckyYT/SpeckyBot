const { RichEmbed } = require('discord.js')
const client = require('nekos.life');
const { nsfw } = new client();

module.exports = async (method, msg) => {
    nsfw[method]().then(async imgURL => {
        let embed = new RichEmbed()
        .setImage(imgURL.url)
        .setColor('FF00AA');
        msg.channel.send(embed)
    })
}