module.exports = {
    event: "message"
}

module.exports.call = async (bot, msg) => {
    if(msg.channel.topicSetting('no-bots')){
        if(msg.author.bot) msg.delete().catch(()=>{})
    }
}
