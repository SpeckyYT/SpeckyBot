module.exports =
    name: 'gcbroadcast'
    description: 'Broadcasts a message'
    usage: '<message>'
    category: 'owner'
    aliases: ['gcb']
    run: (bot, msg) ->
        embed = bot.globalChatEmbed(msg)
        .setThumbnail msg.author.avatarURL
            format: 'png'
            dynamic: true
            size: 512
        .setTitle 'Broadcast!'
        .setAuthor bot.user.username, bot.user.displayAvatarURL()
        .setDescription msg.cmdContent
        .setTimestamp new Date('2000-01-01T00:00:00')

        await Promise.all(
            bot.globalchats
            .map (gc) =>
                gc.send(embed).catch =>
        )

        bot.cmdSuccess('Done!')
