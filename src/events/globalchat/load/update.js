module.exports = {
    event: "interval_5_min"
}

module.exports.call = (bot) => {
    bot.globalchats.forEach(async (c,i) => {
        // bot.globalchats.set(i, await c.fetch(true)) // v12
    })
}
