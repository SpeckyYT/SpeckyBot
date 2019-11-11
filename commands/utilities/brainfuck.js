const bff = require('brainfuckify')

module.exports.run = async (bot, msg, args, owner, prefix) => {
    const bft = bff(args.join(" "));
    bft.split(">").join(">\n ");
    msg.channel.send(bft,{split: {char: '>'}});
}

module.exports.config = {
    name: "brainfuck",
	description: "You ever wished to turn text into BrainFuck? (May break with 15 or more letters)",
    usage: `<text>`,
    category: `utilities`,
	accessableby: "Members",
    aliases: ["brainfuckify","bf","bff","bffy"]
}