module.exports = {
    name: "bots",
    description: "Gives you the online/offline bots list!",
    category: "utilities",
    aliases: ["bot","robot","robots"]
}

const { join } = require('path');
const { listCreator, statusCheckQuantity, membersEmbed } = require(join(__dirname,'functions','misc'))

module.exports.run = async (bot, msg) => {
    await msg.guild.members.fetch();
    const bots = [];
    let list = [];
    msg.guild.members.cache.forEach(member => {
        if(member.user.bot) bots.push(member);
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
