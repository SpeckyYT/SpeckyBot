module.exports =
    name: 'pp'
    description: 'Gives the length of your pp!'
    usage: '<@user>'
    category: 'misc'
    aliases: []
    run: (bot, msg) ->
        user = if msg.mentions.users.size > 0 then msg.mentions.users.first().id else msg.author.id
        p1 = user.substr 4
        pp = p1%13+1
        if user in [
            "268748318664949760",
            "525006281703161867",
            "555791735607787580"
            ...bot.config.owner
            ] then return bot.cmdError("Too long")
        await return msg.channel.send("8#{"=".repeat(pp)}D")
