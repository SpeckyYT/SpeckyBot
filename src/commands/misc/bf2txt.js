module.exports = {
    name: "brainfuck",
    description: "Converts a Brainf*ck string to a text string!",
    usage: `[brainf*ck string]`,
    category: "misc",
    aliases: ["bf","brainfuck2text","brainfucktostring","bftotxt"],
    flags: ['32bit','16bit','8bit','4bit','2bit']
}

module.exports.run = async (bot, msg) => {
    if(!msg.cmdContent) return bot.cmdError(`Brainfuck string missing or invalid`);

    const data = await bot.bf(msg.cmdContent, {
        size: 2**([32,16,8,4,2].find(n => msg.flag(n+'bit')) || 8),
        timeout: 10000,
        async: true
    });

    const { timeout, memory, output, time } = data;

    const sliceL = 512;
    const slice = s => s.length > sliceL ? `${s.slice(0,sliceL)}...` : s;

    const opn = slice(JSON.stringify(output));
    const ops = slice(String.fromCharCode(...output));
    const opc = output.length ? `Output:\n${opn}\n${ops}`.code('js') : '';
    const mmr = slice(JSON.stringify(memory));
    const mms = `Memory: ${memory.length} bytes`;
    const mmm = `${mms}\n${mmr}`.code('js');
    const tm = `Time: ${time}ms`;

    return msg.channel.send(
        bot.membed()
        .setColor(timeout ? 'RED' : 'GREEN')
        .setDescription(`${opc}\n${mmm}\n${tm}`)
    )
}
