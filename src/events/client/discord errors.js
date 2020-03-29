module.exports = {
    event: "error"
}

module.exports.call = async (bot, error) => {
    bot.log()
    bot.log("Discord Error Occurred".fatal)
    bot.log(`${error.name}\n${error.message}`.error)
}
