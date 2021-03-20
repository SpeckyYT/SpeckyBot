module.exports = {
    event: "globalMessage"
}

module.exports.call = async (bot, msg) => {
    msg.content = msg.content.replace(bot.regex.inviteLink,'https://discord.gg/4EecFku');
    msg.content = bot.censorText(msg.content, '\\*');

    bot.globalchats
    .filter(chan => msg.channel.id != chan.id)
    .filter(chan => chan.permissionsFor(bot.user).has(bot.perms.globalchat))
    .forEach(chan => {
        bot.cache.globalchatsent.push(
            chan.send(bot.globalChatEmbed(msg))
            .then(m => {
                if(bot.cache.globalchat.has(msg.id)){
                    bot.cache.globalchat.set(msg.id,[...bot.cache.globalchat.get(msg.id).push(m)]);
                }else{
                    bot.cache.globalchat.set(msg.id,[msg,m]);
                }
            })
            .catch(()=>{})
        )
    })
}
