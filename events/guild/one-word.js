module.exports = async (bot, msg) => {
    if(!msg.channel.topic) return;

    let text = '[one-word]'

    if(msg.channel.topic.toLowerCase().includes(text.toLowerCase())){
        if(msg.content.split(/\s/g).length > 1){
            msg.delete();
        }
    }
}

module.exports.config = {
    event: "message"
}
