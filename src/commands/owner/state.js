module.exports = {
    name: "state",
    description: "Some stuff for the bot's presence",
    usage: `<State>`,
    category: "owner",
    run: async (bot, msg) => msg.cmdContent && bot.statuses.push(msg.cmdContent) && bot.cmdSuccess('Done!') || bot.cmdError('Error')
}
