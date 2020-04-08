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
    if(!msg.content){
        return bot.cmdError(`Message content can't be empty`);
    }
    let text = convert(msg.content);
    msg.channel.send(`\`\`\`bf\n${text}\n\`\`\``,{split: {char: '>'}})
}
