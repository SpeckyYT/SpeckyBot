# This hello world works for most of the CoffeeScript flavoured languages

module.exports =
    name: 'hwcoffee'
    description: 'Hello World!'
    category: 'helloworld'
    run: (bot, msg) ->
        msg.channel.send '`CoffeeScript`: Hello World!'
