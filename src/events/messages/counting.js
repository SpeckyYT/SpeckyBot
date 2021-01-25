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

            const prevMsgs = await msg.channel.messages.fetch({ limit: 2 });
            const prevMsg = prevMsgs.last();

            if(msg.deleted) return;
            if(msg.content != number){
                if(msg.content.startsWith(number - 1) && msg.author.bot){
                    return;
                }else{
                    msg.delete().catch(()=>{});
                }
            }else if(prevMsg.mentions.users.first()){
                if(prevMsg.mentions.users.first().id == msg.author.id){
                    return msg.delete().catch(()=>{});
                }
                if(prevMsgs.filter(ms => ms.author.id == msg.author.id && !msg.author.bot).size < 2){
                    if(!msg.deleted) msg.channel.setTopic(`${text}${number + 1} ${'[alternate]'.toUpperCase()}`);
                }else{
                    msg.delete().catch(()=>{});
                }
            }else if(alttrue && number > 5){
                msg.channel.messages.fetch({ limit: 2 })
                .then(msgs => {
                    if(msgs.filter(ms => ms.author.id == msg.author.id && !msg.author.bot).size < 2){
                        if(!msg.deleted) msg.channel.setTopic(`${text}${number + 1} ${'[alternate]'.toUpperCase()}`);
                    }else{
                        msg.delete().catch(()=>{});
                    }
                })
            }else if(msg.content == number){
                if(!msg.deleted) msg.channel.setTopic(`${text}${number + 1} ${alttrue ? '[alternate]'.toUpperCase() : ''}`);
            }
        }
    }
}
