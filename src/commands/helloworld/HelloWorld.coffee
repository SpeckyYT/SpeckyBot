module.exports =
    name: 'hwcoffee'
    description: 'Hello World!'
    usage: ''
    category: 'helloworld'
    aliases: []
    run: (bot, msg) ->
        await return msg.channel.send "`CoffeeScript`: Hello World!"
