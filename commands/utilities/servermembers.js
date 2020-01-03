const { RichEmbed } = require('discord.js')
const { emotes, listCreator, statusCheckQuantity, membersEmbed } = require('./functions/misc.js')

module.exports.run = async (bot, msg, args, config) => {
    let members = [];
    let list = [];
    msg.guild.members.forEach(async member => {
        if(!members.includes(member)) members.push(member);
    })

    list = listCreator(members, list)

    let online, idle, dnd, offline;

    online = statusCheckQuantity(list,'online');
    idle = statusCheckQuantity(list,'idle');
    dnd = statusCheckQuantity(list,'dnd');
    offline = statusCheckQuantity(list,'offline');

    let { Eonline, Eidle, Ednd, Eoffline } = emotes;

    membersEmbed("Members",msg,[[online,Eonline],[idle,Eidle],[dnd,Ednd],[offline,Eoffline]])
}

module.exports.config = {
	name: "allmembers",
	description: "Gives you the active/inactive members list!",
    usage: ``,
    category: `utilities`,
	accessableby: "Members",
    aliases: ["servermembers"]
}
