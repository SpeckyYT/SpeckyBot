module.exports = {
    event: "message"
}

module.exports.call = async (bot, msg) => {
    if(msg.channel.type == 'dm') return;
    if(msg.channel.topicSetting ? msg.channel.topicSetting('no-bots') : false){
        if(msg.author.bot) msg.delete().catch(()=>{})
    }
}
