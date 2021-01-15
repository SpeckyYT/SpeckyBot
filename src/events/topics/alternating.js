module.exports = {
    event: "message"
}

module.exports.call = async (bot, msg) => {
    if(msg.channel.topicSetting('alternate')){
        let prevMsgs;

        await msg.channel.messages.fetch({ limit: 2 })
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
