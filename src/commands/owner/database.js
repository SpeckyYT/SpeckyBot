module.exports = {
    name: 'database',
    description: 'Gives you the entire database!',
    category: 'owner',
    aliases: ['db']
}

const db = require('quick.db');

module.exports.run = async (bot, msg) => {
    const databases = [
        ['General',''],
        ['Economy','economy']
    ].map(([name,path])=>{
        const database = path ? new db.table(path) : db;
        const json = {}
        database.all().map(data => json[data.ID] = data.data);
        return `${name}\n${JSON.stringify(json,null,2).code('json')}\u200b`
    })

    return msg.channel.send(databases.join('\n'),{split: {chat:'\u200b\n'}});
}
