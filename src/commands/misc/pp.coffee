module.exports =
    name: 'pp'
    description: 'Gives the length of your pp!'
    usage: '<@user>'
    category: 'misc'
    accessableby: 'Members'
    aliases: []
    run: (bot, msg) ->
        user = if msg.mentions.users.size > 0 then msg.mentions.users.first().id else msg.author.id
        p1 = user.substr(4)
        pp = p1%13+1
        await return msg.channel.send("""8#{"=".repeat(pp)}D""")
