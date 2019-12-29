const { evaluate } = require("mathjs");
const { RichEmbed } = require("discord.js");

module.exports.run = async (bot, msg, args, config) => {
    if(!args[0]) return msg.channel.send('Please input a calculation.');

    let resp;
    try{
        resp = evaluate(args.join(' '));
    } catch (e){
        return msg.channel.send('Sorry, please input a valid calculation.')
    }
    const embed = new RichEmbed()
        .setColor("#FFFFFF")
		.setTitle('Math Calculation')
		.addField("Input", `\`\`\`js\n${args.join(' ')}\`\`\``)
		.addField("Output", `\`\`\`js\n${resp}\`\`\``)
	msg.channel.send(embed);
}

module.exports.config = {
	name: "math",
	description: "The math command to evaluate some math!",
    usage: `<problem>`,
    category: `utilities`,
	accessableby: "Members",
    aliases: ["maths","mathematic","mathematics"]
}