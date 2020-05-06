module.exports = {
    event: "ready"
}

module.exports.call = async bot => {
    bot.log("Bot is ready!".success);
}
