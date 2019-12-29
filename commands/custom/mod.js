const { RichEmbed } = require("discord.js");

module.exports.run = async (bot, msg, args, config) => {
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

module.exports.config = {
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
