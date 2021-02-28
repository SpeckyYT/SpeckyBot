{ encode, decode } = require 'morsee'

module.exports = 
    name: "morse",
    description: "Translates between morse code and text!",
    category: "utilities",
    usage: '<.... . .-.. .-.. --- | hello>',
    run: (bot, msg) ->
        content = msg.cmdContent
        return bot.cmdError 'No text or morse code found' if not content
        regex = /^[^a-zA-Z0-9]*$/
        msg.channel.send ((if content.match regex then decode else encode) content).code()
