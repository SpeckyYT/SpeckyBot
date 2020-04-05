module.exports = {
    name: "brainfuck",
	description: "Converts a Brainf*ck string to a text string!",
    usage: `[brainf*ck string]`,
    category: `misc`,
	accessableby: "Members",
    aliases: ["bf","brainfuck2text","brainfucktostring","bftotxt"]
}

const MEM_LENGTH = 256
const MEM_SIZE = 256
const TIME_LIMIT = 1000 // ms

module.exports.run = async (bot, msg) => {
    if(!msg.args[0]){
        return bot.cmdError(`Brainfuck string missing or invalid`);
    }

    let Instructions = [];
    let Loops = [];
    let Skip = 0;
    let pos = 0;
    let Output = {
        string: "",
        numbers: []
    };
    let Cell = 0;
    let Mem = [];

    Instructions = msg.content.split('');
    for(let i=0;i<MEM_LENGTH;i++) Mem.push(0);

    const start = new Date();

    const execute = async () => {
        while (pos < Instructions.length){
            let c = Instructions[pos];

            if (c=='['){
                if(Mem[Cell]!=0) Loops.push(pos);
                if(Mem[Cell]==0) Skip++;
            }

            if (c==']'){
                if(Mem[Cell]!=0){
                    pos = Loops[Loops.length-1];
                }else if (Mem[Cell]==0){
                    if(Skip) Skip--;
                    if (!Skip) Loops.pop();
                }
            }

            if (Skip) return;

            if (c=='+'){
                if(Mem[Cell]+1 >= MEM_SIZE){
                    Mem[Cell] = 0;
                }else{
                    Mem[Cell]++;
                }
            }

            if (c=='-'){
                if(Mem[Cell]-1 < 0){
                    Mem[Cell] = 255;
                }else{
                    Mem[Cell]--;
                }
            }

            if (c=='>'){
                if(Cell+1 > MEM_LENGTH){
                    Cell = MEM_LENGTH;
                }else{
                    Cell++;
                }
            }

            if (c=='<'){
                if(Cell-1 < 0){
                    Cell = 0;
                }else{
                    Cell--;
                }
            }

            if (c=='.'){
                Output.string += String.fromCharCode(Mem[Cell]);
                Output.numbers.push(Mem[Cell]);
            }

            pos++;

            if (new Date() - start > TIME_LIMIT){
                while(Mem.join(",").endsWith(",0")){
                    Mem = Mem.slice(0,Mem.length-1);
                }
                return bot.cmdError(`**Time Limit Exceded**\n${Output.numbers.length > 0 ? `Output:\n\`\`\`${Output.string}\`\`\`\n\`\`\`js\n${Output.numbers.join(" ")}\n\`\`\`\n`:""}Last cell: \`\`\`${Cell}\`\`\`\nMemory:\n\`\`\`js\n${Mem.join(",")}\n\`\`\``);
            }
        }
    }
    await execute();

    while(Mem.join(",").endsWith(",0")){
        Mem = Mem.slice(0,Mem.length-1);
    }

    let out = `${Output.numbers.length > 0 ? `Output:\n\`\`\`${Output.string}\`\`\`\n\`\`\`js\n${Output.numbers.join(" ")}\n\`\`\`\n`:""}Memory: \n\`\`\`js\n${Mem.join(",")}\n\`\`\``;

    return msg.channel.send(out);
}
