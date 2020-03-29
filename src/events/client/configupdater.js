module.exports = {
    event: "interval_1_min"
}

module.exports.call = async (bot) => {
    bot.loadConfig(bot);
}
