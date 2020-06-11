module.exports = {
    name: "unlockall",
    description: "Will unlock the entire server!",
    usage: ``,
    category: `custom`,
    aliases: [],
    servers: ['265505748413448193'],
    perms: ['ADMINISTRATOR'],
    cmdperms: ['MANAGE_ROLES']
}

module.exports.run = async (bot, msg) => {
    msg.guild.members.forEach(async member => {
        if(!member.roles.has("612301459719061555")){
            await member.addRole("612301459719061555");
        }
    })
}
