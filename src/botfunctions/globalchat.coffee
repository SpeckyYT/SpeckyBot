{ RichEmbed } = require('discord.js');

module.exports = (bot) -> 
    bot.globalChatEmbed = (msg) ->
        embed = new RichEmbed()
        .setAuthor(msg.author.username,msg.author.avatarURL)
        .setColor(bot.settings.user?[msg.author.id]?.embedcolor or msg.member.displayHexColor)
        .setDescription(msg.content or '')
        .setFooter(msg.guild.name, msg.guild.iconURL)
        .setTimestamp();
        if msg.author.id.isOwner() then embed.attachFiles(msg.attachments.map((a)->a.url));
        embed
