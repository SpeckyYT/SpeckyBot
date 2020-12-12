{ encode, decode } = require('@yerkopalma/morsee');

module.exports = 
    name: "morse",
    description: "Translates between morse code and text!",
    category: "utilities",
    usage: '<.... . .-.. .-.. --- | hello>',
    run: (bot, msg) ->
        content = msg.cmdContent
        if not content then return bot.cmdError('No text or morse code found');
        regex = /^[^a-zA-Z0-9]*$/;
        msg.channel.send (if content.match regex then decode content else encode content).code()
