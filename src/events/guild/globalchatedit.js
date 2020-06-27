module.exports = {
    event: "messageUpdate"
}

module.exports.call = async (bot, _, msg) => {
    if(msg.author.bot) return;
    const check = (c) => c.topic ? c.topic.toLowerCase().includes('[global]') : false
    if(check(msg.channel)){
        const am = bot.cache.globalchat.get(msg.id);
        if(am){
            am.forEach(async ms => ms.edit(
                bot.embed()
                .setAuthor(msg.author.username)
                .setColor(msg.member.displayHexColor)
                .setDescription(msg.content ? msg.content : '')
                .setThumbnail(msg.author.avatarURL)
                .attachFiles(msg.attachments ? msg.attachments.size ? msg.attachments.map(a=>a.url) : [] : [])
                .setFooter('(edited)')
            ))
        }
    } 
}
