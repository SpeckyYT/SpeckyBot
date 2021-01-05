module.exports = {
    event: "globalMessageUpdate"
}

module.exports.call = async (bot, _, msg) => {
    const am = bot.cache.globalchat.get(msg.id);
    msg.content = msg.content.replace(bot.regex.inviteLink,'https://discord.gg/4EecFku');
    if(am){
        am.forEach(ms => ms.edit(bot.globalChatEmbed(msg)).catch(()=>{}))
    }
}
