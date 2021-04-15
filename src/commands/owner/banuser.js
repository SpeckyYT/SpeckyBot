module.exports = {
    name: 'banuser',
    description: 'Bans a user from using all bot commands',
    usage: '<@User/ID>',
    category: 'owner',
    aliases: ['ban']
}

const db = require('quick.db');

module.exports.run = async (bot, msg) => {
    const res = msg.cmdContent.match(/\d+/g);
    if (!res) return bot.cmdError('No user to ban specified.');

    const target = await bot.users.fetch(res[0]);
    if (!target) return bot.cmdError('Invalid User Mention/ID.');

    if(target.id.isOwner()) return bot.cmdError("Owners can't be banned");

    if(target.bot) return bot.cmdError("Bots can't be banned");

    if (db.get('bannedUsers').includes(target.id))
        return bot.cmdError(`User ${target} is already banned.`);

    db.set('bannedUsers', [...db.get('bannedUsers'),target.id]);

    return bot.cmdSuccess(`${target} is banned from using ${bot.user}.`);
}
