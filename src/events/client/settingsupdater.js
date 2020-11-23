module.exports = {
    event: "* * * * *"
}

module.exports.call = async (bot) => {
    bot.loadSettings();
}
