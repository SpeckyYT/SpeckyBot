module.exports = {
    event: "globalMessageUpdate"
}

module.exports.call = async (bot, _, msg) => {
    const am = bot.cache.globalchat.get(msg.id);
    const inviteRegex = /(?:https?)?(?::\/\/)?(?:di?sc(?:ord(?:app)?)?|top)\.(?:com|gg|invite|net)\/+[\w/]+/gi;
    msg.content = msg.content.replace(inviteRegex,'https://discord.gg/4EecFku');
    if(am){
        am.forEach(ms => ms.edit(bot.globalChatEmbed(msg)).catch(()=>{}))
    }
}
