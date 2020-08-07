module.exports = {
    event: "globalChatRemoved"
}

module.exports.call = async (bot, channel) => {
    channel.send(
        bot.embed()
        .setTitle("This channel got successfully removed from the `Global Chat`!")
        .setDescription("Now you can talk without letting it know to the entire world!")
    )
}
