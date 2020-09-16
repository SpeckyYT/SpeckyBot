module.exports = {
    event: "message"
}

module.exports.call = async (bot, msg) => {
    if(msg.author.bot) return;
    const check = (c) => c.topic ? c.topic.toLowerCase().includes('[global]') : false
    if(check(msg.channel)){
        bot.emit('globalMessage', msg);
    }
}
