const { emotes, listCreator, statusCheckQuantity, membersEmbed } = require('./functions/misc.js')

module.exports.run = async (bot, msg, args, config) => {
    let bots = [];
    let list = [];
    msg.guild.members.forEach(async member => {
        if(member.user.bot){
            if(!bots.includes(member)) bots.push(member);
        }
    })

    list = listCreator(bots, list)

    let online, idle, dnd, offline;

    online = statusCheckQuantity(list,'online');
    idle = statusCheckQuantity(list,'idle');
    dnd = statusCheckQuantity(list,'dnd');
    offline = statusCheckQuantity(list,'offline');

    let { Eonline, Eidle, Ednd, Eoffline } = emotes;

    membersEmbed("Bots", msg, [[online,Eonline],[idle,Eidle],[dnd,Ednd],[offline,Eoffline]])
}

module.exports.config = {
	name: "bots",
	description: "Gives you the online/offline bots list!",
    usage: ``,
    category: `utilities`,
	accessableby: "Members",
    aliases: ["bot","robot","robots"]
}
