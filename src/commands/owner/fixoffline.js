module.exports = {
    name: 'fixoffline',
    category: 'owner'
}

module.exports.run = async (bot, msg) => {
    const guild = bot.guilds.cache.get("538028973058424832");
    if(!guild) return;
    await guild.members.fetch({force: true});
    guild.members.cache.forEach((member) => {
        const offlineRole = '760554589040279592';
        if(member.roles.cache.has(offlineRole)){
            member.roles.remove(offlineRole);
        }
    })
}
