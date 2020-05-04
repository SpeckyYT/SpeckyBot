module.exports =
    name: 'pp'
    description: 'Gives the length of your pp!'
    usage: '<@user>'
    category: 'misc'
    accessableby: 'Members'
    aliases: []
    run: (bot, msg) ->
        await return msg.channel.send("""8#{"=".repeat(((if msg.mentions.users.size > 0 then msg.mentions.users.first().id else msg.author.id).substring(4)%13)+1)}D""")
