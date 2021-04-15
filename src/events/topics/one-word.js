module.exports = {
    event: "cleanMessage"
}

module.exports.call = async (bot, msg) => {
    if(msg.channel.type == 'dm') return;
    if(msg.channel.topicSetting('one-word')){
        if(msg.content.match(/\s/g)) msg.delete().catch(()=>{});
    }
}
