module.exports = {
    name: "brainfuck",
    aliases: ["bf","brainfuck2text","brainfucktostring","bftotxt"]
}

module.exports.run = async (bot, data) => {
    console.log('deprecated'.error);
    /*
    if(!data.args[0]){
        return bot.cmdError(`Brainfuck string missing or invalid`);
    }

    const { tOut, memory, string, numbers, cell } = await bot.bf(data.content);

    if(tOut){
        return bot.cmdError(`${"TIME LIMIT EXCEDED".fatal}\n${numbers.length > 0 ? `Output:\n${string}\n\n${numbers.join(" ")}\n\n`:""}Last cell: \n${cell}\n\nMemory:\n\n${memory.join(",")}\n`);
    }

    const out = `${numbers.length > 0 ? `Output:\n${string.success}\n\n${numbers.join(" ").success}\n\n`:""}Memory: \n\n${memory.join(",").info}\n`;

    console.log(out);
    */
}
