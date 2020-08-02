const { RichEmbed } = require('discord.js');

module.exports = (bot) => {
    bot.globalChatEmbed = (msg) => {
        return new RichEmbed()
        .setAuthor(msg.author.username,msg.author.avatarURL)
        .setColor(msg.member.displayHexColor)
        .setDescription(msg.content ? msg.content : '')
        .attachFiles(msg.attachments.map(a=>a.url))
        .setFooter(msg.guild.name, msg.guild.iconURL)
        .setTimestamp();
    }
}
