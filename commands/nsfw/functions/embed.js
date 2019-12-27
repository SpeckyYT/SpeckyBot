const { RichEmbed } = require('discord.js')

module.exports = async (msg, imgURL) => {
    let embed = new RichEmbed()
    .setImage(imgURL.url)
    .setColor('FF00AA')
    msg.channel.send(embed)
}