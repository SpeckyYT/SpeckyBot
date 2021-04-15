module.exports = {
    name: 'srguildpbs',
    description: 'Gives you all PBs of the current server!',
    category: 'speedrun',
    aliases: []
}

const speedrun = new (require('node-speedrun'))({userAgent: 'Specky'});
const qdb = require('quick.db');
const SRdb = new qdb.table('speedrun');
const { compareTwoStrings } = require('string-similarity');

module.exports.run = async (bot, msg) => {
    return bot.cmdError('Command not finished') // DEPRECATED

    SRdb.all('').map(d => d.data);

    await msg.channel.send('Send the abbreviated name of the game');
    const res1 = await msg.channel.awaitMessages(m => m.author.id == msg.author.id, { max: 1, time: 15000, errors: ['time'] }).catch(()=>null);
    if(!res1) return bot.cmdError('Time expired');

    const game = await speedrun.get(`/games/${res1.first().content}?embed=categories`);

    if(!game.data) return bot.cmdError('Game not found');

    await msg.channel.send('Send the name of the category');
    const res2 = await msg.channel.awaitMessages(m => m.author.id == msg.author.id, { max: 1, time: 15000, errors: ['time'] }).catch(()=>null);

    const category = res2 ? res2.first().content : 'any%';

    const categoryID = game.data.categories.data
    .map(cat => [cat.id,compareTwoStrings(cat.name.toLowerCase(),category.toLowerCase())])
    .sort((a,b) => a[1] - b[1])[0][0];

    const leaderboard = await speedrun.get(`/leaderboards/${game.data.id}/category/${categoryID}`);

    console.log(leaderboard)
}
