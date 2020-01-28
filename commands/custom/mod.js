module.exports = {
    name: "mod",
	description: "Moderates stuffs!",
    usage: ``,
    category: `custom`,
	accessableby: "Members",
    aliases: [],
    servers: ['265505748413448193'],
    perms: ['KICK_MEMBERS'],
    cmdperms: ['MANAGE_ROLES']
}

module.exports.run = async (bot, msg) => {
    let { args } = msg;
    let user = msg.mentions.members.first()
    
    switch(args[0]){

        case 'mute':
            user.addRole('265902715010285568')
        break
        case 'unmute':
            user.removeRole('265902715010285568')
        break
    }
}
