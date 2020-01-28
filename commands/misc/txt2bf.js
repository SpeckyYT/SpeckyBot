module.exports = {
    name: "txt2bf",
	description: "Converts a text string to a Brainf*ck string!",
    usage: `[text string]`,
    category: `misc`,
	accessableby: "Members",
    aliases: ["text2brainfuck","texttobrainfuck","txttobf"]
}

const { convert } = require('ttbf');

module.exports.run = async (bot, msg) => {
    let { config } = bot;
    let { args } = msg;
    if(!args[0]){
        msg.channel.send(`Right syntax: \`${config.prefix}txt2bf [Text String]\``);
        return;
    }
    var newArgs = msg.content.split(" ").splice(1);
    var text = convert(newArgs.join(" "));
    msg.channel.send(`\`\`\`bf\n${text}\n\`\`\``,{split: {char: '>'}})
}
