module.exports = {
    name: "bf2txt",
	description: "Converts a Brainf*ck string to a text string!",
    usage: `[brainf*ck string]`,
    category: `misc`,
	accessableby: "Members",
    aliases: ["brainfuck2text","brainfucktostring","bftotxt"]
}

const uf = require('unfuck');
const comp = uf.compiler({
    type: Uint16Array,
    in: String,
    out: String,
    width: 1024
});

module.exports.run = async (bot, msg) => {
    let { config } = bot;
    let { args } = msg;
    if(!args[0]){
        msg.channel.send(`Right syntax: \`${config.prefix}bf2txt [BF String]\``);
        return;
    }
    if(0){
        var tuf = comp.run(args.join(""),'');
        msg.channel.send(tuf, {split: {char: ' '}});
    }else{
        msg.channel.send("This command causes usually to crash the bot, so it got disabled")
    }
}
