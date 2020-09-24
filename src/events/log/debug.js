module.exports = {
    event: "debug"
}

module.exports.call = async (bot, data) => {
    const channel = bot.channels.cache.get("738849306643267674");
    if(!channel) return;
    if(data.includes("WS")) return;
    if(data.includes("VOICE")) return;
    if(data.match(/\d{1,3}\.\d{1,3}\.\d{1,3}/g)) return
    if(data.includes(bot.token)) return;
    return channel.send(data);
}
