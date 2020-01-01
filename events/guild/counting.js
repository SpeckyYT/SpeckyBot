module.exports = async (bot, msg) => {
    let text = 'Next number: '
    if(msg.channel.topic.startsWith(text)){
        let number = msg.channel.topic.slice(text.length)
        if(!isNaN(number)){
            if(msg.content != number){
                delete(msg)
            }else{
                msg.channel.setTopic(`${text}${number + 1}`)
            }
        }
    }
}

function delete(msg){
    try{msg.delete()}catch{}
}

module.exports.config = {
    event: "message"
}
