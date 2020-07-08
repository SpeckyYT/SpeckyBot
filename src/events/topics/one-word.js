module.exports = {
    event: "message"
}

module.exports.call = async (bot, msg) => {
    if(!msg.channel.topic) return;

    const text = '[one-word]'

    if(msg.channel.topic.toLowerCase().includes(text.toLowerCase())){
        if(msg.content.match(/\s/g)){
            msg.delete().catch(()=>{})
        }
    }
}
