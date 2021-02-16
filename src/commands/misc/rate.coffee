seedRandom = require 'seedrandom'

module.exports =
    name: 'rate'
    description: 'Rates your everything!'
    usage: '<thing>'
    category: 'misc'
    run: (bot, msg) ->
        content = msg.cmdContent.toLowerCase().replace /[^a-zA-Z0-9]/g, ''
        if not content
            return bot.cmdError('You have to enter a thing to rate')
        rng = seedRandom content
        rng() for num in [0..7]
        msg.channel.send "I rate it #{Math.round(rng()*100)} out of 100"
