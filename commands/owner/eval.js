const { inspect } = require("util")

module.exports.run = async (bot, msg) => {
    try {
        let toEval = msg.Args.join(" ")
        let evaluated = inspect(eval(toEval, { depth: 0 }));
        
        if (!toEval) {
            return msg.channel.send(`Error while evaluating: \`air\``);
        } else {
            let hrStart = process.hrtime()
            let hrDiff;
            hrDiff = process.hrtime(hrStart);
            return msg.channel.send(`\`\`\`js\n${evaluated}\n\`\`\``, { maxLength: 1900 })
        }
        
    } catch (e) {
        return msg.channel.send(`Error while evaluating.\n\n\`\`\`${e.message}\`\`\``);
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
