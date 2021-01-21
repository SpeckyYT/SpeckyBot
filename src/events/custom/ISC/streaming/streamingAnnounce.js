module.exports = {
    event: ['streamingStart']
}

const { parse } = require('url');

const channels = [
    '667813614681456640'
]

module.exports.run = async (bot,presence) => {
    if(presence.user && presence.user.bot) return;
    const activity = presence.activities.find(act => act.type == 'STREAMING');
    if(!activity) return;

    const channs = channels
    .filter(c => bot.channels.cache.has(c))
    .map(c => bot.channels.cache.get(c))
    .filter(c => c.send);

    channs.forEach(c =>
        c.guild.members.cache.has(presence.userID) &&
        c.send(
            bot.embed()
            .setTitle(`${presence.user ? presence.user.username : parse(activity.url).pathname.slice(1)} is streaming!`)
            .setURL(activity.url)
            .setTimestamp(activity.createdTimestamp)
            .addField('Title',activity.details)
            .addField('Game',activity.state)
        ).catch(()=>{})
    )
}
