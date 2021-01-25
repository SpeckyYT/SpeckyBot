module.exports = {
    event: "message"
}

module.exports.call = async (bot, msg) => {
    if(msg.channel.topicSetting('alternate')){
        const prevMsgs = await msg.channel.messages.fetch({ limit: 2 });

        if(prevMsgs.filter(ms => ms.author.id == msg.author.id).size > 1){
            msg.delete().catch(()=>{});
        }
    }
}
