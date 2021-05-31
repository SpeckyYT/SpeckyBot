module.exports =
    name: 'aaaaaaa'
    description: 'Gives AAAAAAAAAAA!'
    usage: ''
    category: 'misc'
    type: 'send'
    aliases: ['aaaaaa','aaaaa','aaaa']
    run: (bot, msg) ->
        if Math.random() * 50 < 5
            bot.emotes.aaaaa.repeat Math.random() * 5 + 10
        else
            'A'.repeat Math.random() * 50 + 50
