{ MessageEmbed } = require('discord.js');

module.exports = (bot) ->
    bot.embed = ->
        new MessageEmbed()
        .setColor(bot.config.color)
        .setThumbnail(bot.user.displayAvatarURL({format:'png'}))
        .setTimestamp(new Date())
        .setAuthor(bot.user.username, bot.user.displayAvatarURL(), "https://github.com/SpeckyYT/SpeckyBot");

    bot.globalChatEmbed = (msg) ->
        new MessageEmbed()
        .setAuthor(msg.author.username,msg.author.displayAvatarURL(),msg.url)
        .setColor(bot.settings.user?[msg.author.id]?.embedcolor or msg.member.displayHexColor)
        .setDescription(msg.content or '')
        .setFooter(msg.guild.name, msg.guild.iconURL())
        .setTimestamp()
        .attachFiles(msg.attachments.map((a)->a.url));

