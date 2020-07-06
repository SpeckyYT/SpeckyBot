module.exports = {
    name: "bots",
    description: "Gives you the online/offline bots list!",
    usage: ``,
    category: `utilities`,
    aliases: ["bot","robot","robots"]
}

const { emotes, listCreator, statusCheckQuantity, membersEmbed } = require('./functions/misc.js')

module.exports.run = async (bot, msg) => {
    const bots = [];
    let list = [];
    msg.guild.members.forEach(async member => {
        if(member.user.bot){
            if(!bots.includes(member)) bots.push(member);
        }
    })

    list = listCreator(bots, list)

    const online = statusCheckQuantity(list,'online');
    const idle = statusCheckQuantity(list,'idle');
    const dnd = statusCheckQuantity(list,'dnd');
    const offline = statusCheckQuantity(list,'offline');

    const { Eonline, Eidle, Ednd, Eoffline } = emotes;

    membersEmbed("Bots", msg, [[online,Eonline],[idle,Eidle],[dnd,Ednd],[offline,Eoffline]])
}
