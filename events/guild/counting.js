module.exports = async (bot, msg) => {
    if(!msg.channel.topic) return;
    let text = 'Next number:'
    if(msg.channel.topic.toLowerCase().startsWith(text.toLowerCase())){
        if(msg.author.bot) return msg.delete();
        let alt = '[alternate]'
        let alttrue = msg.channel.topic.toLowerCase().includes(alt);
        let number = parseInt(msg.channel.topic.slice(text.length).trim());
        if(!isNaN(number)){
            if(msg.deleted) return;
            if(msg.content != number){
                msg.delete().catch(()=>{return})
            }else if(alttrue && number > 5){
                msg.channel.fetchMessages({ limit: 2 })
                .then(msgs => {
                    if(msgs.filter(ms => ms.author.id == msg.author.id).size < 2){
                        if(!msg.deleted) msg.channel.setTopic(`${text} ${number + 1} ${alt.toUpperCase()}`);
                    }else{
                        msg.delete().catch(()=>{return})
                    }
                })
            }else{
                if(!msg.deleted) msg.channel.setTopic(`${text} ${number + 1} ${alttrue?alt.toUpperCase():''}`);
            }
        }
    }
}

module.exports.config = {
    event: "message"
}
