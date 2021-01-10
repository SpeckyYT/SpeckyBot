{ MessageEmbed } = require('discord.js');
qdb = require('quick.db');
usersettings = new qdb.table('usersettings')

module.exports = (bot) ->
    bot.membed = ->
        new MessageEmbed()

    bot.embed = ->
        new MessageEmbed()
        .setColor(bot.config.color)
        .setThumbnail(bot.user.displayAvatarURL({format:'png'}))
        .setTimestamp()
        .setAuthor(bot.user.username, bot.user.displayAvatarURL(), "https://github.com/SpeckyYT/SpeckyBot");

    bot.globalChatEmbed = (msg) ->
        new MessageEmbed()
        .setAuthor(msg.author.username,msg.author.displayAvatarURL(),msg.url)
        .setColor(if usersettings.has(s = "#{msg.author.id}.embedcolor") then usersettings.get(s) else msg.member.displayHexColor)
        .setDescription(msg.content or '')
        .setFooter(msg.guild.name, msg.guild.iconURL())
        .setTimestamp()
        .attachFiles(msg.attachments.map((a)->a.url));

