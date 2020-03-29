module.exports = {
    event: "message"
}

module.exports.call = async (bot, msg) => {
    if(msg.channel.type != "dm") return;
    console.log(`[DM] [${msg.author.id}] ${msg.author.tag}: ${msg.content}`.dms);
}
