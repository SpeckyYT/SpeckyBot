module.exports = {
    event: "filteredMessage"
}

const qdb = require('quick.db');
const usersettings = new qdb.table('usersettings');
const mathscopes = new qdb.table('mathscopes');
const { evaluate } = require('mathjs');

module.exports.call = (bot, msg) => {
    if(!msg.content) return;
    if(!usersettings.get(`${msg.author.id}.math`)) return;

    const scope = mathscopes.get(`${msg.author.id}`) || {}

    try{
        const res = String(evaluate(msg.content, scope));

        if(Object.keys(scope).length > 0) mathscopes.set(`${msg.author.id}`, scope);

        if(res != msg.content && res !== "undefined"){
            msg.channel.send(String(res).slice(0,50).code('js'));
        }
    }catch(err){}
}
