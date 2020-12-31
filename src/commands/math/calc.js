module.exports = {
    name: "calc",
    description: "The math command to evaluate some math!",
    usage: "<problem>",
    category: "math",
    flags: ['delete','scope'],
    aliases: ["calculator","calculate","cal"]
}

const qdb = require('quick.db');
const mathscopes = new qdb.table('mathscopes');
const { evaluate } = require("mathjs");

module.exports.run = async (bot, msg) => {
    if(msg.flag('scopes') || msg.flag('scope')){
        const scopes = mathscopes.get(`${msg.author.id}`) || {}
        return msg.channel.send(JSON.stringify(scopes,null,2).code('json'))
    }
    if(msg.flag('delete')){
        const scope = msg.Args[0];
        if(!scope) return bot.cmdError('Scope to delete not included');
        mathscopes.delete(`${msg.author.id}.${scope}`);
        return bot.cmdSuccess(`Scope \`${scope}\` deleted!`)
    }

    if(!msg.cmdContent) return bot.cmdError('Input a calculation');
    const scopes = mathscopes.get(`${msg.author.id}`) || {}
    let resp;
    try{
        resp = evaluate(msg.cmdContent, scopes);
        if(Object.keys(scopes).length > 0) mathscopes.set(`${msg.author.id}`, scopes)
    } catch (e){
        return bot.cmdError(e.toString());
    }
    return msg.channel.send(
        bot.embed()
        .setColor("#FFFFFF")
        .setTitle('Math Calculation')
        .addField("Input", String(msg.cmdContent).code('js'))
        .addField("Output", String(resp).code('js'))
    );
}
