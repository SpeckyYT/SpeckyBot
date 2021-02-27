module.exports = {
    event: "message"
}

module.exports.call = async (bot, msg) => {
    if(!msg.channel.topicSetting('global')) return;
    const channel = bot.channels.cache.get("813019518141333525");
    if(!channel) return;
    if(msg.content)
        return channel.send(bot.globalChatEmbed(msg));
    if(msg.embeds.length)
        return channel.send(msg.embeds[0]);
}
