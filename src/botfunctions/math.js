const qdb = require('quick.db');
const mathscopes = new qdb.table('mathscopes');
const { evaluate } = require('mathjs');
const { Script } = require('vm');

module.exports = (bot) => {
    bot.matheval = (problem, msg) => {
        const dbkey = msg ? msg.author.id : 'general';
        const scopes = mathscopes.get(`${dbkey}`) || {};
        const context = {
            problem,
            scopes,
            evaluate
        }
        try{
            new Script('result = evaluate(problem,scopes)')
            .runInNewContext(context, {timeout: 5000});
            if(Object.keys(scopes).length > 0) mathscopes.set(`${dbkey}`, scopes);
        }catch(err){
            context.error = err
        }
        if(
            isType(context.result,'undefined','function') ||
            Array.isArray(context.result) &&
            !context.result.filter(i => !isType(i,'undefined','function')).length
        ) context.result = undefined
        return {result: context.result, error: context.error};
    }
}

const isType = (item,...types) => types.includes(typeof item);
