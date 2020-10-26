module.exports = {
    name: "moderators",
    description: "Gives you the active/inactive moderators list!",
    category: "utilities",
    aliases: ["moderator","mods"]
}

const { join } = require('path');
const { listCreator, statusCheckQuantity, membersEmbed } = require(join(__dirname,'functions','misc'))

module.exports.run = async (bot, msg) => {
    await msg.guild.members.fetch();
    const mods = [];
    let list = [];
    msg.guild.members.cache.forEach(member => {
        if(member.permissions.has('MANAGE_MESSAGES') && !member.user.bot) mods.push(member);
    })

    list = listCreator(mods, list)

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

    membersEmbed("Mods", msg, [[online,Eonline],[idle,Eidle],[dnd,Ednd],[offline,Eoffline]])
}
