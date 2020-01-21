module.exports = async (bot, msg) => {
    if(!msg.channel.topic) return;

    let text = '[one-word]'

    if(msg.channel.topic.toLowerCase().includes(text.toLowerCase())){
        if(msg.content.match(/\s/g)){
            msg.delete().catch()
        }
    }
}

module.exports.config = {
    event: "message"
}
