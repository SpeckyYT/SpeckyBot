const { inspect } = require("util")

module.exports.run = async (bot, msg) => {
    let toEval = msg.Args.join(" ");

    let evaluated;
    try{
        evaluated = inspect(eval(toEval, { depth: 0 }));
    }catch(e){
        return msg.channel.send(`Error while evaluating.\n\n\`\`\`${e.message}\`\`\``);
    }

    if (!toEval) {
        return msg.channel.send(`Error while evaluating: \`air\``);
    } else {
        return msg.channel.send(`\`\`\`js\n${evaluated}\n\`\`\``, { maxLength: 1900 })
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
