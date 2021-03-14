module.exports = {
    event: ['ready','channelUpdate','*/30 * * * *']
}

module.exports.call = (bot) => {
    const servers = [];
    const filter = c =>
        c.type == 'text' &&
        c.guild &&
        c.topicSetting('global') &&
        !c.isNSFW(true) &&
        (
            c.guild.memberCount -
            c.guild.members.cache.filter(m=>m.user.bot).size
        ) >= bot.cache.gcminmembers || 10 &&
        c.permissionsFor(bot.user).has(bot.perms.globalchat) &&
        !servers.includes(c.guild.id) &&
        (
            servers.push(c.guild.id),
            true
        );
    bot.globalchats = bot.channels.cache.filter(filter);
}
