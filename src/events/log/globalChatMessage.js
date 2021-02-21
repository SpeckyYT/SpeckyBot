module.exports = {
    event: "filteredMessage"
}

module.exports.call = async (bot, msg) => {
    if(!msg.channel.topicSetting('global')) return;
    const channel = bot.channels.cache.get("813019518141333525");
    if(!channel) return;
    return channel.send(bot.globalChatEmbed(msg));
}
