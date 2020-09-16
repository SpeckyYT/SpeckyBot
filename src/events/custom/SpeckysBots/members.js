module.exports = {
    event: ["interval_5_min","guildMemberAdd"]
}

module.exports.call = async (bot) => {
    const guild = bot.guilds.get("538028973058424832");
    if(!guild) return;

    const memberRole = "755858124946014208";

    guild.members
    .filter(m => !m.roles.has(memberRole))
    .forEach(m => m.addRole(memberRole).catch(()=>{}))
}
