module.exports = {
    name: 'dbmanip',
    description: 'Lets you meanipulate you the database!',
    category: 'owner',
    usage: '{<database>} [<property>] (<action>) <JSON>',
    aliases: ['dbm']
}

const db = require('quick.db');

module.exports.run = (bot, msg) => {
    const regex = /^(?:{(.*)})?\s*(?:\[(.*)\])?\s*(?:\((.*)\))?\s*(?:(.*))?$/;
    const res = msg.cmdContent.match(regex);

    if(!res || !res[0]) return bot.cmdError('Nothing found (check usage)');

    const [,database,property,action,json] = res;

    let newJson = json;
    try{
        newJson = JSON.parse(json);
    }catch{}

    let mdb = db;
    if(database) mdb = new db.table(database);

    if(!property) return bot.cmdError('No property found');

    if(!action) return bot.cmdError('No action found');

    if(typeof mdb[action] != 'function') return bot.cmdError('Action is not valid');
    const result = mdb[action](property,newJson);

    return msg.channel.send(JSON.stringify(result,null,2).code('json'));
}
