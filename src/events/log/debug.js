module.exports = {
    event: "debug"
}

module.exports.call = async (bot, data) => {
    const channel = bot.channels.get("738849306643267674");
    if(!channel) return;
    if(data.toLowerCase().includes("[ws]")) return;
    if(data.includes(bot.token)) return;
    return channel.send(data);
}
