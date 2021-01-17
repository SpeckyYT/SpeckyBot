module.exports = {
    event: ["*/5 * * * *","presenceUpdate"]
}

const speckysBots = "538028973058424832";
const offlineRole = "760554589040279592";

module.exports.call = async (bot, oldPresence, newPresence) => {
    return; // disabled
    if(newPresence && newPresence.user.bot) return;
    if(newPresence && !bot.guilds.cache.get(speckysBots).members.cache.has(newPresence.user.id)) return;

    const guild = bot.guilds.cache.get(speckysBots);
    if(!guild) return;

    const members = await guild.members.fetch({force: !newPresence});

    members
    .filter(m => !m.user.bot)
    .filter(m => (m.presence.status == 'offline') ^ (m.roles.cache.has(offlineRole)))
    .forEach(m => m.roles[m.roles.cache.has(offlineRole)?'remove':'add'](offlineRole));
}
