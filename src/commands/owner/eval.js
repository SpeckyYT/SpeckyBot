module.exports = {
    name: "eval",
    description: "Runs custom code directly from Discord!",
    usage: `<code in js>`,
    category: "owner",
    aliases: ["evaluate"],
}

const { inspect } = require("util");
const i = (s,d=0) => inspect(s,false,d);

module.exports.run = async (bot, msg) => {
    let evaluated;

    try{
        evaluated = eval(msg.cmdContent);
    }catch(e){
        return bot.cmdError(`Error while evaluating.\n\n${String(e.message).code()}`);
    }

    const m = await msg.channel.send(i(evaluated).slice(0,1980).code('js'));

    if(evaluated instanceof Array){
        if(evaluated.some(i => i instanceof Promise)){
            await Promise.all(evaluated).catch(e=>e);
            return m.edit(i(evaluated,1).slice(0,1980).code('js'));
        }
    }

    if(evaluated instanceof Promise){
        await evaluated.catch(e=>e);
        return m.edit(i(evaluated,1).slice(0,1980).code('js'));
    }
}
