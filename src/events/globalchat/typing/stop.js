module.exports = {
    event: "typingStop"
}

module.exports.call = (bot,channel,user) => {
    if(user.bot) return;
    if(bot.globalchats.has(channel.id)){
        bot.globalchats.filter(c => c.id != channel.id).forEach(c => c.stopTyping());
    }
}
