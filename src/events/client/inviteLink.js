module.exports = {
    event: "ready",
    type: "on"
}

module.exports.call = async (bot) => {
    await bot.generateInvite(2147483135)
    .then(l => bot.link = l)
}
