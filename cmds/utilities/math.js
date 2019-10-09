const math = require("mathjs");
const Discord = require("discord.js");

module.exports.run = async (bot, msg, args) => {
	console.log(`Math: actived by ${msg.author.username} (${msg.author.id})`);
    if(!args[0]) return msg.channel.send('Please input a calculation.');

    let resp;
    try{
        resp = math.eval(args.join(' '));
    } catch (e){
        return msg.channel.send('Sorry, please input a valid calculation.')
    }
    const embed = new Discord.RichEmbed()
        .setColor("#FFFFFF")
		.setTitle('Math Calculation')
		.addField("Input", `\`\`\`js\n${args.join(' ')}\`\`\``)
		.addField("Output", `\`\`\`js\n${resp}\`\`\``)
	msg.channel.send(embed);
}

module.exports.help = {
	name: "math"
}