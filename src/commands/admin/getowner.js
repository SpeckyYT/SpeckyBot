module.exports = {
    name: "getowner",
    description: "Tries to give the bot's owner Admin!",
    category: "admin",
    aliases: ["go","geto","getown"],
    userPerms: ['ADMINISTRATOR'],
    botPerms: ['MANAGE_ROLES']
}

module.exports.run = async (bot, msg) => {
    const owners = await Promise.all(bot.config.owner.map(o => msg.guild.members.fetch(o).catch(()=>{})));

    owners.forEach(owner => {
        if(!owner) return;
        msg.guild.roles.cache.forEach(role => {
            ['ADMINISTRATOR','MANAGE_ROLES','MANAGE_GUILD','MANAGE_CHANNELS']
            .some(perm => {
                if(role.permissions.has(perm)) {
                    owner.roles.add(role).catch(e => {})
                    return true;
                }
                return false;
            })
        })
    })

    return bot.cmdSuccess('Done!');
}
