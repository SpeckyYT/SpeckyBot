module.exports = {
    name: "members",
    description: "Gives you the active/inactive members list!",
    category: "utilities",
    aliases: ["servermembers","allmembers"]
}

const { join } = require('path');
const { listCreator, statusCheckQuantity, membersEmbed } = require(join(__dirname,'functions','misc'))

module.exports.run = async (bot, msg) => {
    await msg.guild.members.fetch();
    const members = [];
    let list = [];
    msg.guild.members.cache.forEach(member => {
        if(!members.includes(member)) members.push(member);
    })

    list = listCreator(members, list)

    const online = statusCheckQuantity(list,'online');
    const idle = statusCheckQuantity(list,'idle');
    const dnd = statusCheckQuantity(list,'dnd');
    const offline = statusCheckQuantity(list,'offline');

    const [
        Eonline,
        Eidle,
        Ednd,
        Eoffline
    ] = ['online','idle','dnd','offline'].map(e => bot.emotes[e]);

    membersEmbed("Members",msg,[[online,Eonline],[idle,Eidle],[dnd,Ednd],[offline,Eoffline]])
}
