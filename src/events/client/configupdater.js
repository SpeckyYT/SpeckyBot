module.exports = {
    event: "*/30 * * * * *"
}

module.exports.call = async (bot) => {
    bot.loadConfig();
}
