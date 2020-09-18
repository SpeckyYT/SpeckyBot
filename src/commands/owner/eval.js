module.exports = {
    name: "eval",
    description: "Runs custom code directly from Discord!",
    usage: `<code in js>`,
    category: "owner",
    aliases: ["evaluate"],
}

const { inspect } = require("util");

module.exports.run = async (bot, msg) => {
    const toEval = msg.cmdContent;

    let evaluated;

    if (!toEval) return bot.cmdError("You need to insert valid JavaScript code");

    try{
        evaluated = inspect(eval(toEval),{depth:0});
    }catch(e){
        return msg.channel.send(`Error while evaluating.\n\n\`\`\`${e.message}\`\`\``);
    }

    return msg.channel.send(`${evaluated.length<1980?"```js\n":''}${evaluated}${evaluated.length<1990?"\n```":''}`, { split: '\n' })
}
