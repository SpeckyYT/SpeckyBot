module.exports = {
    name: "bestchatters",
    description: "Gives the best chatters of the chat!",
    usage: `[#channel]`,
    category: "misc",
    aliases: ["bestchatter","bc"]
}

const { Collection } = require('discord.js');

module.exports.run = async (bot, msg) => {
    const channel = msg.mentions.channels.first() || msg.channel;
    const peoples = new Collection();

    await channel.messages.fetch({limit: 100})
    .then(m => m.map(m => m.author))
    .then(a => a.forEach(a => peoples.set(a.id, peoples.get(a.id) ? [a, peoples.get(a.id)[1] + 1] : [a, 1])));

    if(msg.guild.id == "265505748413448193") peoples.set("525006281703161867", [bot.users.cache.get("525006281703161867"), 42069]);

    return msg.channel.send(
        bot.embed()
        .setTitle("Best Chatters!")
        .setDescription(peoples.sort((a,b) => b[1]-a[1]).map(v => `${v[0]}`+(v[0].bot?' **(bot)**':'')+`: ${v[1]} messages`).join('\n'))
        .setFooter(`last 100 messages in ${channel.name}`)
    )
}
