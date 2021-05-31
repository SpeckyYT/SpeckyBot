module.exports =
    name: "emojify"
    description: "Emojifies your text!"
    category: "misc"
    aliases: [
        "emojifier"
        "emojifying"
    ]

module.exports.run = (bot, msg) ->
    msg.channel.send bot.textToEmojiSpam msg.cmdContent
