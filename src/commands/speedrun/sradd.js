module.exports = {
    name: 'sradd',
    description: 'Adds you to the speedrun database of this bot!',
    category: 'speedrun',
    usage: '<username>',
    aliases: []
}

const speedrun = new (require('node-speedrun'))({userAgent: 'Specky'});
const qdb = require('quick.db');
const SRdb = new qdb.table('speedrun');

module.exports.run = async (bot, msg) => {
    if(!msg.cmdContent) return bot.cmdError('No username found');

    const user = await speedrun.users.get(msg.cmdContent);
    if(!user.data) return bot.cmdError('User not found');

    const { id, names: { international }} = user.data

    SRdb.set(msg.author.id, {id,name:international});
    return bot.cmdSuccess(`User \`${user.data.names.international}\` got successfully linked to your account!`)
}
