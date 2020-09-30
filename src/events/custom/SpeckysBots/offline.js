module.exports = {
    event: ["interval_1_min","guildMemberUpdate"]
}

const speckysBots = "538028973058424832";
const offlineRole = "760554589040279592";

module.exports.call = async (bot, oldMember, newMember) => {
    if(newMember.user.bot) return;
    const guild = bot.guilds.cache.get(speckysBots);
    if(!guild) return;
    if(oldMember && newMember){
        if(newMember.guild.id != speckysBots) return;
        const isOffline = newMember.presence.status == 'offline';
        const hasOffline = newMember.roles.cache.has(offlineRole);
        if(isOffline && !hasOffline){
            await newMember.roles.add(offlineRole)
            .catch(()=>{});
        }
        if(!isOffline && hasOffline){
            await newMember.roles.remove(offlineRole)
            .catch(()=>{});
        }
    }

    guild.members.cache
    .filter(m => !m.user.bot)
    .filter(m => (m.presence.status == 'offline') ^ (m.roles.cache.has(offlineRole)))
    .forEach(async m => await m.roles[m.roles.cache.has(offlineRole)?'remove':'add'](offlineRole));
}
