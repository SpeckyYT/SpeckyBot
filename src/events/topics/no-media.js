module.exports = {
    event: "message"
}

module.exports.call = async (bot, msg) => {
    if(msg.channel.topicSetting ? msg.channel.topicSetting('no-media') : false){
        const linkRegEx = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&\\/=]*)/g

        const matches = msg.content.match(linkRegEx);

        if(msg.attachments.first()){
            msg.delete().catch(()=>{});
        }else
        if(msg.embeds.length > 0){
            msg.delete().catch(()=>{});
        }else
        if(matches){
            msg.delete().catch(()=>{});
        }
    }
}
