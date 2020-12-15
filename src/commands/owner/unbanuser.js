module.exports = {
    name: 'unbanuser',
    description: 'Unbas a user from using bot commands',
    usage: '<@User/ID>',
    category: 'owner',
    aliases: ['unban']
}

const db = require('quick.db');

module.exports.run = async (bot, msg) => {
    const res = msg.cmdContent.match(/\d+/g);
    if (!res) return bot.cmdError('No user to ban specified.');

    const target = await bot.users.fetch(res[0]);
    if (!target) return bot.cmdError('Invalid User Mention/ID.');

    if (!db.get('bannedUsers').includes(target.id))
        return bot.cmdError(`User ${target} is not banned.`);

    db.set('bannedUsers', db.get('bannedUsers').remove(target.id));

    return bot.cmdSuccess(`${target} is no longer banned from using ${bot.user}.`);
}
