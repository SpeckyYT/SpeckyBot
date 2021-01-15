module.exports = {
    event: "filteredMessage"
}

module.exports.call = async (bot, msg) => {
    if(!msg.channel.topic) return;
    const text = 'Next number: '
    if(msg.channel.topic.toLowerCase().startsWith(text.toLowerCase())){
        const alttrue = msg.channel.topicSetting('alternate');
        const number = parseInt(msg.channel.topic.slice(text.length).trim());
        if(!isNaN(number)){

            let prevMsg;
            let prevMsgs;

            await msg.channel.messages.fetch({ limit: 2 })
            .then(msgs => {
                prevMsgs = msgs;
                prevMsg = msgs.last();
            });

            if(msg.deleted) return;
            if(msg.content != number){
                if(msg.content.startsWith(number - 1) && msg.author.bot){
                    return;
                }else{
                    msg.delete().catch(()=>{
                        return
                    })
                }
            }else if(prevMsg.mentions.users.first()){
                if(prevMsg.mentions.users.first().id == msg.author.id){
                    msg.delete().catch(()=>{
                        return
                    })
                    return;
                }
                if(prevMsgs.filter(ms => ms.author.id == msg.author.id && !msg.author.bot).size < 2){
                    if(!msg.deleted) msg.channel.setTopic(`${text}${number + 1} ${'[alternate]'.toUpperCase()}`);
                }else{
                    msg.delete().catch(()=>{
                        return
                    })
                }
            }else if(alttrue && number > 5){
                msg.channel.messages.fetch({ limit: 2 })
                .then(msgs => {
                    if(msgs.filter(ms => ms.author.id == msg.author.id && !msg.author.bot).size < 2){
                        if(!msg.deleted) msg.channel.setTopic(`${text}${number + 1} ${'[alternate]'.toUpperCase()}`);
                    }else{
                        msg.delete().catch(()=>{
                            return
                        })
                    }
                })
            }else if(msg.content == number){
                if(!msg.deleted) msg.channel.setTopic(`${text}${number + 1} ${alttrue ? '[alternate]'.toUpperCase() : ''}`);
            }
        }
    }
}
