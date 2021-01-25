module.exports = {
    event: "message"
}

module.exports.call = async (bot, msg) => {
    if(msg.channel.type == 'dm') return;
    if(msg.channel.topicSetting('no-media')){
        const matches = msg.content.match(bot.regex.link);
        if(msg.attachments.first() || msg.embeds.length > 0 || matches) return msg.delete().catch(()=>{});
    }
}
