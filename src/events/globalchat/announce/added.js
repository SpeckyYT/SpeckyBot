module.exports = {
    event: "globalChatAdded"
}

module.exports.call = async (bot, channel) => {
    channel.send(
        bot.embed()
        .setTitle("This channel got successfully added to the `Global Chat`!")
        .setDescription("Now you can talk to the entire world!\nCheck out the `globalchat` command for the rules, notes and informations.")
    ).catch(()=>{})
}
