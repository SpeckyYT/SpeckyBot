module.exports = {
    event: "ready"
}

const { Collection } = require("discord.js");

module.exports.call = (bot) => {
    if(!bot.globalchats) bot.globalchats = new Collection();
    bot.channels.filter(c => c.topicSetting('global'))
    .forEach((v,i) => {
        bot.globalchats.set(i,v);
    });
}
