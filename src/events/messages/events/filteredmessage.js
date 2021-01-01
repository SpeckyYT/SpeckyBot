module.exports = {
    event: "message"
}

const db = require('quick.db');

module.exports.call = async (bot, msg) => {
    if(msg.author.bot) return;
    if(msg.system) return;
    if(!msg.content) return;
    if(!msg.author.id.isOwner()){
        if(msg.channel.topicSetting('no-bots')) return;
        if(db.get('bannedUsers').includes(msg.author.id)) return;
    }

    return bot.emit('filteredMessage', msg);
}
