module.exports = {
    name: "math",
    description: "The math command to evaluate some math!",
    usage: `<problem>`,
    category: "math",
    aliases: ["maths","mathematic","mathematics","calculator","calc","calculate","cal"]
}

const { evaluate } = require("mathjs");

module.exports.run = async (bot, msg) => {
    const { cmdContent } = msg;
    if(!cmdContent) return bot.cmdError('Input a calculation');
    const scope = bot.cache.math[msg.author.id] || {}
    let resp;
    try{
        resp = evaluate(cmdContent, scope);
        if(Object.keys(scope).length > 0){
            bot.cache.math[msg.author.id] = scope;
        }
    } catch (e){
        return bot.cmdError(e.toString());
    }
    const embed = bot.embed()
    .setColor("#FFFFFF")
    .setTitle('Math Calculation')
    .addField("Input", String(cmdContent).code('js'))
    .addField("Output", String(resp).code('js'))
    return msg.channel.send(embed);
}
