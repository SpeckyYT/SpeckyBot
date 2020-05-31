module.exports = {
    name: "math",
    description: "The math command to evaluate some math!",
    usage: `<problem>`,
    category: `utilities`,
    accessableby: "Members",
    aliases: ["maths","mathematic","mathematics","calculator","calc","calculate","cal"]
}

const { evaluate } = require("mathjs");

module.exports.run = async (bot, msg) => {
    const { content } = msg;
    if(!content) return msg.channel.send('Please input a calculation.');

    let resp;
    try{
        resp = await evaluate(content);
    } catch (e){
        return msg.channel.send('Sorry, please input a valid calculation.')
    }
    const embed = bot.embed()
        .setColor("#FFFFFF")
        .setTitle('Math Calculation')
        .addField("Input", `\`\`\`js\n${content}\`\`\``)
        .addField("Output", `\`\`\`js\n${resp}\`\`\``)
    msg.channel.send(embed);
}
