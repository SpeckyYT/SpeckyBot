module.exports = {
    event: "filteredMessage"
}

const qdb = require('quick.db');
const usersettings = new qdb.table('usersettings');
const { inspect } = require('util');

module.exports.call = (bot, msg) => {
    if(!msg.content) return;
    if(!usersettings.get(`${msg.author.id}.math`)) return;

    const { result } = bot.matheval(msg.content, msg);

    if(typeof result == 'undefined') return;
    if(result == msg.content) return;

    return msg.channel.send(inspect(result).slice(0,100).code('js'));
}
