module.exports = {
    event: "globalMessageUpdate"
}

module.exports.call = async (bot, _, msg) => {
    const am = bot.cache.globalchat.get(msg.id);
    const inviteRegex = /(https?:\/\/)?(www\.)?(((discord|dsc|top)\.(gg|io|me|li)|discordapp\.com\/invite|invite\.gg))(\/|\\\/|\\)[A-z+0-9]{1,}/g;
    msg.content = msg.content.replace(inviteRegex,'https://discord.gg/4EecFku');
    if(am){
        am.forEach(ms => ms.edit(bot.globalChatEmbed(msg)).catch(()=>{}))
    }
}
