const db = require('quick-db');

module.exports = {
    name: 'unbanuser',
    description: 'Unbas a user from using bot commands',
    usage: '<@User/ID>',
    category: 'owner',
    userPerms: ['ADMINISTRATOR'],
    botPerms: ['MANAGE_MESSAGES'],
}

module.exports.run = async (bot, msg) => {
    const {args} = msg;
    if (args.length < 1) return msg.channel.send({embed:{title:'Error! 🛑',description:'No one specified.\nUsage: `unbanuser <@User/ID>`',color:'RED'}});
    const target = msg.mentions.users.first() || bot.users.cache.get(args[0]);
    if (!target) return msg.channel.send({embed:{title:'Error! 🛑',description:'Invalid User Mention/ID.\nUsage: `unbanuser <@User/ID>`',color:'RED'}});
    let bannedUsers = db.get('bannedUsers');
    if (bannedUsers.includes(target.id)) {
        bannedUsers.delete('bannedUsers', target.id)
        msg.channel.send({embed:{title:'Success!',description:`<@${target.id}> was unbanned from using SpeckyBot!`,color:'GREEN'}});
    } else {
        msg.channel.send({embed:{title:'Error! 🛑',description:`User <@${target.id}> is not banned.\nUsage: \`unbanuser <@User/ID>\``,color:'RED'}});
    }
}
