module.exports =
    name: "8ball"
    description: "Ask it to the 8-Ball!"
    usage: "[question]"
    category: "games"
    aliases: [
        "8b"
        "magic8ball"
        "m8b"
    ]


positive = [
    "It is certain"
    "It is decidedly so"
    "Without a doubt"
    "Yes – definitely"
    "You may rely on it"
    "As I see it, yes"
    "Most likely"
    "Outlook good"
    "Yes"
    "Signs point to yes"
]

neutral = [
    "Reply hazy, try again"
    "Ask again later"
    "Better not tell you now"
    "Cannot predict now"
    "Concentrate and ask again"
]

negative = [
    "Don't count on it"
    "My reply is no"
    "My sources say no"
    "Outlook not so good"
    "Very doubtful"
]

module.exports.run = (bot, msg) ->
    question = msg.cmdContent.toLowerCase().replace /[^a-z]/g, ''

    if not question then return bot.cmdError 'You have to ask a question'

    msg.channel.send(
        bot.embed()
        .setTitle('Magic 8-Ball')
        .setThumbnail("https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/8-Ball_Pool.svg/1024px-8-Ball_Pool.svg.png")
        .setDescription [
                positive
                neutral
                negative
            ].seedpick(question,1).seedpick(question,2)
    )
