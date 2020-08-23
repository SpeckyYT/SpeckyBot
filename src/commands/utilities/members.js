module.exports = {
    name: "members",
    description: "Gives you the active/inactive members list!",
    usage: "",
    category: `utilities`,
    aliases: ["servermembers","allmembers"]
}

const { emotes, listCreator, statusCheckQuantity, membersEmbed } = require('.\\functions\\misc.js')

module.exports.run = async (bot, msg) => {
    const members = [];
    let list = [];
    msg.guild.members.forEach(async member => {
        if(!members.includes(member)) members.push(member);
    })

    list = listCreator(members, list)

    const online = statusCheckQuantity(list,'online');
    const idle = statusCheckQuantity(list,'idle');
    const dnd = statusCheckQuantity(list,'dnd');
    const offline = statusCheckQuantity(list,'offline');

    const { Eonline, Eidle, Ednd, Eoffline } = emotes;

    membersEmbed("Members",msg,[[online,Eonline],[idle,Eidle],[dnd,Ednd],[offline,Eoffline]])
}
