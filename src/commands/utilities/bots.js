module.exports = {
    name: "bots",
    description: "Gives you the online/offline bots list!",
    category: "utilities",
    aliases: ["bot","robot","robots"]
}

const { join } = require('path');
const { listCreator, statusCheckQuantity, membersEmbed } = require(join(__dirname,'functions','misc'))

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

    const [
        Eonline,
        Eidle,
        Ednd,
        Eoffline
    ] = ['online','idle','dnd','offline'].map(e => bot.emotes[e]);

    membersEmbed("Bots", msg, [[online,Eonline],[idle,Eidle],[dnd,Ednd],[offline,Eoffline]])
}
