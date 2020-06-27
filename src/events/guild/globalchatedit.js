module.exports = {
    event: "messageUpdate"
}

const { RichEmbed } = require('discord.js');

module.exports.call = async (bot, _, msg) => {
    if(msg.author.bot) return;
    const check = (c) => c.topic ? c.topic.toLowerCase().includes('[global]') : false
    if(check(msg.channel)){
        const am = bot.cache.globalchat.get(msg.id);
        if(am){
            am.forEach(async ms => ms.edit(
                new RichEmbed()
                .setAuthor(msg.author.username,msg.author.avatarURL)
                .setColor(msg.member.displayHexColor)
                .setDescription(msg.content ? msg.content : '')
                .attachFiles(msg.attachments ? msg.attachments.size ? msg.attachments.map(a=>a.url) : [] : [])
                .setFooter('(edited)')
            ))
        }
    } 
}
