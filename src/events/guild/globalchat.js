module.exports = {
    event: "message"
}

module.exports.call = async (bot, msg) => {
    if(msg.author.bot) return;
    const check = (c) => c.topic ? c.topic.toLowerCase().includes('[global]') : false
    if(check(msg.channel)){
        bot.channels.filter(chan => check(chan) && msg.channel.id != chan.id).forEach(async chan => {
            const emb = bot.embed()
            .setAuthor(msg.author.username)
            .setColor(msg.member.displayHexColor)
            .setDescription(msg.content ? msg.content : '')
            .setThumbnail(msg.author.avatarURL)
            .attachFiles(msg.attachments ? msg.attachments.size ? msg.attachments.map(a=>a.url) : [] : []);
            chan.send(emb)
            .then(m => {
                if(bot.cache.globalchat.get(msg.id)){
                    bot.cache.globalchat.set(msg.id,bot.cache.globalchat.get(msg.id).push(m));
                }else{
                    bot.cache.globalchat.set(msg.id,[m]);
                }
            })
            .catch(()=>{});
        })
    } 
}
