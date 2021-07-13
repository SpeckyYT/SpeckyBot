module.exports = {
    event: "globalChatRemoved"
}

module.exports.call = async (bot, channel) => {
    await channel.send(
        bot.embed()
        .setTitle("This channel got successfully removed from the `Global Chat`!")
        .setDescription("Now you can talk without letting it know to the entire world!")
    ).catch(()=>{})
    return bot.globalchats
        .filter(c => c.channel.id !== channel.id)
        .filter(c => c.permissionsFor(bot.user).has(bot.perms.globalchat))
        .forEach(c => c.send(
            bot.globalChatEmbed(`**${channel.guild.name}** has left the global chat.`)
            .setThumbnail(channel.guild.iconURL({ dynamic: true }))
        ).catch(()=>{})
    );
}
