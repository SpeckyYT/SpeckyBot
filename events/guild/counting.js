module.exports = async (bot, msg) => {
    if(!msg.channel.topic) return;
    let text = 'Next number: '
    if(msg.channel.topic.startsWith(text)){
        if(msg.author.bot) return msg.delete();
        let number = msg.channel.topic.slice(text.length);
        if(!isNaN(number)){
            if(msg.content != number){
                msg.delete();
            }else{
                msg.channel.setTopic(`${text}${parseInt(number,10) + 1}`);
            }
        }
    }
}

module.exports.config = {
    event: "message"
}
