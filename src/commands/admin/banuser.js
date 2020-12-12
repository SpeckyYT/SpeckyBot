const db = require('quick-db');

module.exports = {
    name: 'banuser',
    description: 'Bans a user from using all bot commands',
    usage: '<@User/ID>',
    category: 'admin',
    userPerms: ['ADMINISTRATOR'],
    botPerms: ['MANAGE_MESSAGES'],
}

module.exports.run = async (bot, msg) => {
    const owners = await Promise.all(bot.config.owner.map(o => msg.guild.members.fetch(o).catch(()=>{})))
    if (!owners.length < 1) return;
    const {args} = msg;
    if (args.length < 1) return msg.channel.send({embed:{title:'Error! 🛑',description:'No one specified.\nUsage: `banuser <@User/ID>`',color:'RED'}});
    const target = msg.mentions.users.first() || bot.users.cache.get(args[0]);
    if (!target) return msg.channel.send({embed:{title:'Error! 🛑',description:'Invalid User Mention/ID.\nUsage: `banuser <@User/ID>`',color:'RED'}});
    let bannedUsers = db.get('bannedUsers');
    if (bannedUsers.includes(target.id)) return msg.channel.send({embed:{title:'Error! 🛑',description:`User <@${target.id}> is already banned.\nUsage: \`banuser <@User/ID>\``,color:'RED'}});
    bannedUsers.push('bannedUsers', target.id);
    msg.channel.send({embed:{title:'Success!',description:`<@${target.id}> is banned from using SpeckyBot!`,color:'GREEN'}});
}
