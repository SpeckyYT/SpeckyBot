module.exports = {
    event: "typingStart"
}

module.exports.call = (bot,channel,user) => {
    if(user.bot) return;
    if(bot.globalchats.has(channel.id)){
        bot.globalchats.forEach(c => c.startTyping(1));
    }
}
