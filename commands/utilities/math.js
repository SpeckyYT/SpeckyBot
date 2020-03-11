module.exports = {
	name: "math",
	description: "The math command to evaluate some math!",
    usage: `<problem>`,
    category: `utilities`,
	accessableby: "Members",
    aliases: ["maths","mathematic","mathematics","calculator","calc","calculate"]
}

const { evaluate } = require("mathjs");

module.exports.run = async (bot, msg) => {
    let { args } = msg;
    if(!args[0]) return msg.channel.send('Please input a calculation.');

    let resp;
    try{
        resp = evaluate(args.join(' '));
    } catch (e){
        return msg.channel.send('Sorry, please input a valid calculation.')
    }
    const embed = bot.embed()
        .setColor("#FFFFFF")
		.setTitle('Math Calculation')
		.addField("Input", `\`\`\`js\n${args.join(' ')}\`\`\``)
		.addField("Output", `\`\`\`js\n${resp}\`\`\``)
	msg.channel.send(embed);
}
