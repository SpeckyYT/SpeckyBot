module.exports = {
    event: "filteredMessage"
}

module.exports.call = async (bot, msg) => {
    if(msg.channel.type != "dm") return;
    bot.log(`[DM] [${msg.author.id}] ${msg.author.tag}: ${msg.content}`.dms);
}
