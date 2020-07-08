module.exports = {
    event: "message"
}

module.exports.call = async (bot, msg) => {
    if(!msg.channel.topic) return;

    const text = '[alternate]'

    if(msg.channel.topic.toLowerCase().includes(text.toLowerCase())){
        let prevMsgs;

        await msg.channel.fetchMessages({ limit: 2 })
        .then(msgs => {
            prevMsgs = msgs;
        });

        if(msg.deleted){
            return;
        }
        
        if(prevMsgs.filter(ms => ms.author.id == msg.author.id).size > 1){
            msg.delete().catch(()=>{
                return
            })
        }
    }
}
