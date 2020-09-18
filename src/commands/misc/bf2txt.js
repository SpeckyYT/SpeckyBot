module.exports = {
    name: "brainfuck",
    description: "Converts a Brainf*ck string to a text string!",
    usage: `[brainf*ck string]`,
    category: "misc",
    aliases: ["bf","brainfuck2text","brainfucktostring","bftotxt"],
    flags: ['32bit','16bit','8bit','4bit','2bit']
}

module.exports.run = async (bot, msg) => {
    if(!msg.args[0]){
        return bot.cmdError(`Brainfuck string missing or invalid`);
    }

    const insts = msg.cmdContent;

    const data = await bot.bf(insts,{
        limit:true,
        size: 2**([32,16,8,4,2].find(n => msg.flag(n+'bit')) || 8)
    });

    const { tOut, memory, string, numbers, cell, time } = data;

    if(tOut){
        return bot.cmdError(`**Time Limit Exceded**\n${numbers.length > 0 ? `Output:\n\`\`\`\n${string}\n\`\`\`\n\`\`\`js\n${numbers.join(" ")}\n\`\`\`\n`:""}Last cell: \`\`\`\n${cell}\n\`\`\`\nMemory:\n\`\`\`js\n${memory.join(",")}\n\`\`\`\nTime: **${time}ms**`);
    }

    const out = `${numbers.length > 0 ? `Output:\n\`\`\`\n${string}\n\`\`\`\n\n\`\`\`js\n${numbers.join(" ")}\n\`\`\`\n\n`:""}Memory: \n\`\`\`js\n${memory.join(",")}\n\`\`\`\nTime: **${time}ms**`;

    return msg.channel.send(out);
}
