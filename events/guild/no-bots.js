module.exports = async (bot, msg) => {
    if(!msg.channel.topic) return;

    let text = '[no-bots]'

    if(msg.channel.topic.toLowerCase().includes(text.toLowerCase())){
        if(msg.author.bot) msg.delete().catch()
    }
}

module.exports.config = {
    event: "message"
}
