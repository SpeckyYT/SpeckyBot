const { RichEmbed } = require('discord.js');

module.exports = (bot) => {
    bot.globalChatEmbed = (msg) => {
        const embed = new RichEmbed()
        .setAuthor(msg.author.username,msg.author.avatarURL)
        .setColor(msg.member.displayHexColor)
        .setDescription(msg.content ? msg.content : '')
        .setFooter(msg.guild.name, msg.guild.iconURL)
        .setTimestamp();

        if(msg.author.id.isOwner()) embed.attachFiles(msg.attachments.map(a=>a.url));

        return embed;
    }
}
