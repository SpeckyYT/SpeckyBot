module.exports = {
    name: "globalchats",
    description: "Gives you some more informations about the Global Chat!",
    category: "important",
    aliases: ['globalchat','gc']
}

module.exports.run = async (bot, msg) =>
    msg.channel.send(
        bot.globalChatRules()
    )

