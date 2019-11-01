const bff = require('brainfuckify')

module.exports.run = async (bot, msg, args, owner, prefix) => {
    const bft = bff(args.join(" "));
    msg.channel.send(bft,{split: true});
}

module.exports.config = {
    name: "brainfuck",
	description: "You ever wished to turn text into BrainFuck? (May break with 15 or more letters)",
    usage: `<text>`,
    category: `utilities`,
	accessableby: "Members",
    aliases: ["brainfuckify","bf","bff","bffy"]
}