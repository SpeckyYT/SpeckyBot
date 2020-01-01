module.exports = async (bot, msg) => {
    let text = 'Next number: '
    if(msg.channel.topic.includes(text)){
        let number = msg.channel.topic.slice(text.length)
        if(!isNaN(number)){
            if(msg.content != number){
                msg.delete()
            }else{
                msg.channel.setTopic(`${text}${number + 1}`)
            }
        }
    }
}

module.exports.config = {
    event: "message"
}
