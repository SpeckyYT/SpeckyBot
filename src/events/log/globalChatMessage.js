module.exports = {
    event: "message"
}

module.exports.call = async (bot, msg) => {
    if(msg.author.id == bot.user.id) return;
    if(!msg.channel.topicSetting('global')) return;
    const channel = bot.channels.cache.get("813019518141333525");
    if(!channel) return;
    const data = [
        `Message: ${msg.id}`,
        `Author: ${msg.author.id}`,
        `Guild: ${msg.guild.id}`,
        `is Bot: ${msg.author.bot}`
    ]
    if(!msg.author.bot || !msg.embeds.length)
        return channel.send(data, bot.globalChatEmbed(msg));
    if(msg.embeds.length)
        return channel.send(data, msg.embeds[0]);
}
