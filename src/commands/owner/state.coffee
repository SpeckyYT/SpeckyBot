module.exports =
    name: "state"
    description: "Some stuff for the bot's presence"
    usage: '<presence>'
    category: "owner"
    run: (bot, msg) => 
        if msg.cmdContent
            bot.cache.statuses.push(msg.cmdContent)
            bot.cmdSuccess('Done!')
        else
            bot.cmdError('Error')
