module.exports = {
    name: "moderators",
    description: "Gives you the active/inactive moderators list!",
    usage: ``,
    category: `utilities`,
    accessableby: "Members",
    aliases: ["moderator","mods"]
}

const { emotes, listCreator, statusCheckQuantity, membersEmbed } = require('./functions/misc.js')

module.exports.run = async (bot, msg) => {
    const mods = [];
    let list = [];
    msg.guild.members.forEach(async member => {
        if(member.hasPermission('MANAGE_MESSAGES',true,true,false)){
            if(!mods.includes(member) && !member.user.bot) mods.push(member);
        }
    })

    list = listCreator(mods, list)

    const online = statusCheckQuantity(list,'online');
    const idle = statusCheckQuantity(list,'idle');
    const dnd = statusCheckQuantity(list,'dnd');
    const offline = statusCheckQuantity(list,'offline');

    const { Eonline, Eidle, Ednd, Eoffline } = emotes;

    membersEmbed("Mods", msg, [[online,Eonline],[idle,Eidle],[dnd,Ednd],[offline,Eoffline]])
}
