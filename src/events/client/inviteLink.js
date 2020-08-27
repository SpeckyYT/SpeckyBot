module.exports = {
    event: "ready"
}

module.exports.call = async (bot) => {
    bot.link = await bot.generateInvite(2147483135);
}
