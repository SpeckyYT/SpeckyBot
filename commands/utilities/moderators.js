const { emotes, listCreator, statusCheckQuantity, membersEmbed } = require('./functions/misc.js')

module.exports.run = async (bot, msg, args, config) => {
    let mods = [];
    let list = [];
    msg.guild.members.forEach(async member => {
        if(member.hasPermission('MANAGE_MESSAGES',true,true,false)){
            if(!mods.includes(member) && !member.user.bot) mods.push(member);
        }
    })

    list = listCreator(mods, list)

    let online, idle, dnd, offline;

    online = statusCheckQuantity(list,'online');
    idle = statusCheckQuantity(list,'idle');
    dnd = statusCheckQuantity(list,'dnd');
    offline = statusCheckQuantity(list,'offline');

    let { Eonline, Eidle, Ednd, Eoffline } = emotes;

    membersEmbed("Mods", msg, [[online,Eonline],[idle,Eidle],[dnd,Ednd],[offline,Eoffline]])
}

module.exports.config = {
	name: "moderators",
	description: "Gives you the active/inactive moderators list!",
    usage: ``,
    category: `utilities`,
	accessableby: "Members",
    aliases: ["moderator","mods"]
}
