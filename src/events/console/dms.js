module.exports = {
    event: "message"
}

module.exports.call = async (bot, msg) => {
    if(msg.channel.type != "dm") return;
    if(msg.author.bot) return;
    if(!msg.content) return;
    bot.log(`[DM] [${msg.author.id}] ${msg.author.tag}: ${msg.content}`.dms);
}
