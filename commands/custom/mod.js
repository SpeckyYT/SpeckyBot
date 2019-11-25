const { RichEmbed } = require("discord.js");
const Math = require('mathjs');

module.exports.run = async (bot, msg, args, config) => {
    if(!msg.member.hasPermission('KICK_MEMBERS')) return msg.channel.send('why tf are you even trying to do this?');
    
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
    category: `misc`,
	accessableby: "Members",
    aliases: [],
    servers: [265505748413448193]
}