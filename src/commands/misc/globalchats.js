module.exports = {
    name: "globalchats",
    description: "Gives you all global chats!",
    usage: "",
    category: "misc",
    aliases: ['globalchat','gc']
}

module.exports.run = async (bot, msg) => {
    const channels = bot.channels
    .filter(c => c.topic ? c.topic.toLowerCase().includes('[global]') : false)
    .sort((a,b) => a.name.localeCompare(b.name));
    return msg.channel.send(
        bot.embed()
        .setTitle('Global Chats!')
        .setDescription(channels.map(c => `\`${c.name}\` \`${c.guild.name}\``).join('\n'))
        .setFooter(`${channels.size} Globlal Chats`)
    )
}
