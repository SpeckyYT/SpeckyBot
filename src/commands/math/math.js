module.exports = {
    name: "math",
    description: "The math command to evaluate some math!",
    usage: `<problem>`,
    category: `math`,
    aliases: ["maths","mathematic","mathematics","calculator","calc","calculate","cal"]
}

const { evaluate } = require("mathjs");

module.exports.run = async (bot, msg) => {
    const { cmdContent } = msg;
    if(!cmdContent) return bot.cmdError('Input a calculation');

    if(!bot.cache.math[msg.author.id]){
        bot.cache.math[msg.author.id] = {}
    }

    let resp;
    try{
        resp = evaluate(cmdContent, bot.cache.math[msg.author.id]);
    } catch (e){
        return bot.cmdError(e.toString());
    }
    const embed = bot.embed()
    .setColor("#FFFFFF")
    .setTitle('Math Calculation')
    .addField("Input", `\`\`\`js\n${cmdContent}\`\`\``)
    .addField("Output", `\`\`\`js\n${resp}\`\`\``)
    return msg.channel.send(embed);
}
