module.exports =
    name: "emojify"
    description: "Emojifies your text!"
    category: "misc"
    aliases: [
        "emojifier"
        "emojifying"
    ]

module.exports.run = (bot, msg) ->
    return bot.cmdError 'Command requires text' if not msg.cmdContent
    msg.channel.send bot.textToEmojiSpam msg.cmdContent
