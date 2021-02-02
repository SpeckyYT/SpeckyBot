module.exports = {
    name: "calc",
    description: "The math command to evaluate some math!",
    usage: "<problem>",
    category: "math",
    flags: ['delete','scopes','deleteall'],
    aliases: ["calculator","calculate","cal"]
}

const qdb = require('quick.db');
const mathscopes = new qdb.table('mathscopes');

module.exports.run = async (bot, msg) => {
    if(msg.flag('scopes') || msg.flag('scope')){
        const scopes = mathscopes.get(`${msg.author.id}`) || {};
        return msg.channel.send(JSON.stringify(scopes,null,2).code('json'));
    }
    if(msg.flag('delete')){
        const scope = msg.Args[0];
        if(!scope) return bot.cmdError('Scope to delete not included');
        mathscopes.delete(`${msg.author.id}.${scope}`);
        return bot.cmdSuccess(`Scope \`${scope}\` deleted!`);
    }
    if(msg.flag('deleteall')){
        mathscopes.delete(`${msg.author.id}`);
        return bot.cmdSuccess('All your scopes got deleted!');
    }

    if(!msg.cmdContent) return bot.cmdError('No input found');

    const { result, error } = bot.matheval(msg.cmdContent, msg);

    if(error) return bot.cmdError(error);

    return msg.channel.send(
        bot.embed()
        .setTitle('Math Calculation')
        .addField("Input", msg.cmdContent.code('js'))
        .addField("Output", `${result}`.slice(0,1950).code('js'))
    );
}
