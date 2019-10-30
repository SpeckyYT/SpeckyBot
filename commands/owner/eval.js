const { inspect } = require("util")

module.exports.run = async (bot, msg, args, owner, prefix) => {
    if(msg.author.id == owner) {
        try {
            let toEval = args.join(" ")
			let evaluated = inspect(eval(toEval, { depth: 0 }));
            
            if (!toEval) {
                return msg.channel.send(`Error while evaluating: \`air\``);
            } else {
                let hrStart = process.hrtime()
                let hrDiff;
                hrDiff = process.hrtime(hrStart);
                return msg.channel.send(`*Executed in ${hrDiff[0] > 0 ? `${hrDiff[0]}s ` : ''}${hrDiff[1] / 1000000}ms.*\n\`\`\`javascript\n${evaluated}\n\`\`\``, { maxLength: 1900 })
            }
            
        } catch (e) {
            return console.log(`Error while evaluating`);
        }

    } else {
        return msg.reply(" you are not the bot owner!").then(msg => msg.delete(5000));
    }
}


module.exports.config = {
        name: "eval",
        description: "Runs custom code directly from Discord!",
        usage: `<code in js>`,
        category: `owner`,
        accessableby: "Bot Owner",        
        aliases: ["evaluate"],
}