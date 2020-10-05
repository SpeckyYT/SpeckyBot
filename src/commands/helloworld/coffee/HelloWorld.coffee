module.exports =
    name: 'hwcoffee'
    description: 'Hello World!'
    category: 'helloworld'
    run: (bot, msg) ->
        await return msg.channel.send "`CoffeeScript`: Hello World!"
