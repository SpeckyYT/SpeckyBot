module.exports = {
    event: "filteredMessage"
}

module.exports.call = async (bot, msg) => {
    if(msg.channel.topicSetting('global'))
        if(msg.channel.permissionsFor(bot.user).has(bot.perms.globalchat))
            bot.emit('globalMessage', msg);
}
