const uf = require('unfuck');
const comp = uf.compiler({
    type: Uint16Array,
    in: String,
    out: String,
    width: 102400
});

module.exports.run = async (bot, msg, args, config) => {
    if(!args[0]){
        msg.channel.send(`Right syntax: \`${config.prefix}bf2txt [BF String]\``);
        return;
    }
    var tuf = comp.run(args.join(""),'');
    msg.channel.send(tuf,{split: {char: ' '}});
}

module.exports.config = {
    name: "bf2txt",
	description: "Converts a Brainf*ck string to a text string!",
    usage: `[brainf*ck string]`,
    category: `misc`,
	accessableby: "Members",
    aliases: ["brainfuck2text","brainfucktostring","bftotxt"]
}