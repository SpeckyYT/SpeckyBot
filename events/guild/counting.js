module.exports = async (bot, msg) => {
    if(!msg.channel.topic) return;
    let text = 'Next number:'
    if(msg.channel.topic.startsWith(text)){
        if(msg.author.bot) return msg.delete();
        let alt = '[alternate]'
        let alttrue = msg.channel.topic.toLowerCase().includes(alt);
        let number = parseInt(msg.channel.topic.slice(text.length).trim());
        if(!isNaN(number)){
            if(msg.content != number){
                msg.delete();
            }else if(alttrue){
                msg.channel.fetchMessages({ limit: 2 })
                .then(msgs => {
                    if(msgs.filter(ms => ms.author.id == msg.author.id).size < 2){
                        msg.channel.setTopic(`${text} ${number + 1} ${alt.toUpperCase()}`);
                    }else{
                        msg.delete();
                    }
                })
            }else{
                msg.channel.setTopic(`${text} ${number + 1}`);
            }
        }
    }
}

module.exports.config = {
    event: "message"
}
