module.exports = {
    event: "typingStop"
}

module.exports.call = (bot,channel,user) => {
    if(user.bot) return;
    if(bot.globalchats.has(channel.id)){
        bot.globalchats.forEach(c => c.stopTyping());
    }
}
