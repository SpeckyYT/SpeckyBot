module.exports = {
    event: "filteredMessage"
}

module.exports.call = async (bot, msg) => {
    const check = (c) => c.topic ? c.topic.toLowerCase().includes('[global]') : false
    if(check(msg.channel)){
        bot.emit('globalMessage', msg);
    }
}
