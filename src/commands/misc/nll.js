module.exports = {
    name: "namelesslanguage",
	description: "Converts a Nameless Language string to a text string!",
    usage: `[nll string]`,
    category: `misc`,
	accessableby: "Members",
    aliases: ["nll"]
}

module.exports.run = async (bot, msg) => {
    if(!msg.args[0]){
        return bot.cmdError(`Brainfuck string missing or invalid`);
    }

    insts = msg.content;

    const { error, tOut, memory, string, numbers, cell, time } = bot.nll(insts,{limit:true});

    if(tOut){
        return bot.cmdError(`**Time Limit Exceded**\n${numbers.length > 0 ? `Output:\n\`\`\`\n${string}\n\`\`\`\n\`\`\`js\n${numbers.join(" ")}\n\`\`\`\n`:""}Last cell: \`\`\`\n${cell}\n\`\`\`\nMemory:\n\`\`\`js\n${memory.join(",")}\n\`\`\`\nTime: **${time}ms**`);
    }

    let out = `${numbers.length > 0 ? `Output:\n\`\`\`\n${string}\n\`\`\`\n\n\`\`\`js\n${numbers.join(" ")}\n\`\`\`\n\n`:""}Memory: \n\`\`\`js\n${memory.join(",")}\n\`\`\`\nTime: **${time}ms**`;

    return msg.channel.send(out);
}
