module.exports = {
    name: "lockall",
    description: "Will lock the entire server!",
    usage: ``,
    category: `custom`,
    aliases: [],
    servers: ['265505748413448193'],
    perms: ['ADMINISTRATOR'],
    cmdperms: ['MANAGE_ROLES']
}

module.exports.run = async (bot, msg) => {
    msg.guild.members.forEach(async member => {
        if(member.roles.has("612301459719061555")){
            await member.removeRole("612301459719061555");
        }
    })
}