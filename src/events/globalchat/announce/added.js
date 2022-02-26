module.exports = {
    event: "globalChatAdded"
}

module.exports.call = async (bot, channel) => {
    await channel.send(
        bot.embed()
        .setTitle("This channel got successfully added to the `Global Chat`!")
        .setDescription("Now you can talk to the entire world!")
    ).catch(()=>{});
    await channel.send(bot.globalChatRules()).catch(()=>{});
    return bot.globalchats
        .filter(c => c.channel.id !== channel.id)
        .filter(c => c.permissionsFor(bot.user).has(bot.perms.globalchat))
        .forEach(c => c.send(
            bot.globalChatEmbed(`**${channel.guild.name}** has joined the global chat!`)
            .setThumbnail(channel.guild.iconURL({ dynamic: true }))
        ).catch(()=>{})
    );
}
