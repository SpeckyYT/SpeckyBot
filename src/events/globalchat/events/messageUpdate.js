module.exports = {
    event: "messageUpdate"
}

module.exports.call = async (bot, _, msg) => {
    if(msg.author.bot) return;
    if(msg.system) return;
    const check = (c) => c.topic ? c.topic.toLowerCase().includes('[global]') : false
    if(check(msg.channel)){
        bot.emit('globalMessageUpdate', _, msg);
    }
}
