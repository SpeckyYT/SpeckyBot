module.exports = {
    name: "gcdelete",
    description: "Deletes a message from the global-chat!",
    usage: '<Message ID>',
    category: "owner"
}

module.exports.run = async (bot, msg) => {
    if(msg.ids.length) return bot.cmdError('No ID found');
    msg.ids.forEach(async id => {
        const mID = bot.cache.globalchat.findKey(gcm =>
            gcm.find(m => m.id == id)
        ) || bot.cache.gcmessages.has(id);
        if(!mID) return msg.channel.send(`ID ${id} not found`);
        const message = bot.cache.gcmessages.get(id);
        if(!message) return msg.channel.send('idk how this error happened.');
        const done = await message.delete().then(()=>true).catch(()=>false);
        return msg.channel.send(`The deletion of ID ${id} was${done?'':"n't"} successful`);
    })
}
