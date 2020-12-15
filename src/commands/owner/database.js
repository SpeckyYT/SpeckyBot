module.exports = {
    name: 'database',
    description: 'Gives you the entire database!',
    category: 'owner',
    aliases: ['db']
}

const db = require('quick.db');

module.exports.run = async (bot, msg) => {
    const database = db.all();
    const json = {}
    database.map(data => json[data.ID] = data.data);
    return msg.channel.send(JSON.stringify(json,null,2).code('json'));
}
