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

    let resp;
    try{
        resp = await evaluate(cmdContent);
    } catch (e){
        return bot.cmdError('Input a valid calculation')
    }
    const embed = bot.embed()
    .setColor("#FFFFFF")
    .setTitle('Math Calculation')
    .addField("Input", `\`\`\`js\n${cmdContent}\`\`\``)
    .addField("Output", `\`\`\`js\n${resp}\`\`\``)
    return msg.channel.send(embed);
}
