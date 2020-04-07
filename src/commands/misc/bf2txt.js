module.exports = {
    name: "brainfuck",
	description: "Converts a Brainf*ck string to a text string!",
    usage: `[brainf*ck string]`,
    category: `misc`,
	accessableby: "Members",
    aliases: ["bf","brainfuck2text","brainfucktostring","bftotxt"]
}

const MEM_LENGTH = 2**10;
const MEM_SIZE = 2**8;
const TIME_LIMIT = 500; // ms

module.exports.run = async (bot, msg) => {
    if(!msg.args[0]){
        return bot.cmdError(`Brainfuck string missing or invalid`);
    }

    let Instructions = [];
    let Loops = [];
    let Skip = 0;
    let pos = 0;
    let Output = {
        string: [],
        numbers: []
    };
    let Cell = 0;
    let Mem = [];

    const end = new Date().getTime() + TIME_LIMIT;
    let error = false;

    Instructions = msg.content.split('');

    const exec = async () => {
        while (pos < Instructions.length){

            if (new Date().getTime() > end){
                error = true;
                break;
            }

            if(!Mem[Cell] && Mem[Cell] !== 0){
                Mem.push(0);
            }

            let c = Instructions[pos];

            console.log(c);

            if (c.includes('[')){
                if(Mem[Cell]){
                    Loops.push(pos);
                }else{
                    Skip++
                }
            }

            if (c.includes(']')){
                if(Mem[Cell]){
                    pos = Loops[Loops.length-1];
                }else{
                    if(Skip > 0){
                        Skip--;
                    }else{
                        Loops.pop();
                    }
                }
            }

            if(Skip > 0) return;

            if (c.includes('.')){
                Output.string.push(String.fromCharCode(Mem[Cell]));
                Output.numbers.push(Mem[Cell]);
            }

            if (c.includes('+')){
                if(Mem[Cell]+1 >= MEM_SIZE){
                    Mem[Cell] = 0;
                }else{
                    Mem[Cell]++;
                }
            }

            if (c.includes('-')){
                if(Mem[Cell]-1 < 0){
                    Mem[Cell] = MEM_SIZE-1;
                }else{
                    Mem[Cell]--;
                }
            }

            if (c.includes('>')){
                if(Cell+1 > MEM_LENGTH){
                    Cell = MEM_LENGTH;
                }else{
                    Cell++;
                }
            }

            if (c.includes('<')){
                if(!Cell-1 < 0){
                    Cell = 0;
                }else{
                    Cell--;
                }
            }

            pos++;
        }
    }
    await exec();

    while(Mem.join(",").endsWith(",0") || Mem.join(",").length > 1800){
        Mem = Mem.slice(0,Mem.length-1);
    }

    while(Output.string.join("").length > 1800){
        Output.string = Output.string.slice(0,Output.string.length);
        Output.numbers = Output.numbers.slice(0,Output.numbers.length);
    }

    if(error){
        return bot.cmdError(`**Time Limit Exceded**\n${Output.numbers.length > 0 ? `Output:\n\`\`\`${Output.string.join('')}\`\`\`\n\`\`\`js\n${Output.numbers.join(" ")}\n\`\`\`\n`:""}Last cell: \`\`\`\n${Cell}\n\`\`\`\nMemory:\n\`\`\`js\n${Mem.join(",")}\n\`\`\``);
    }

    let out = `${Output.numbers.length > 0 ? `Output:\n\`\`\`${Output.string.join('')}\`\`\`\n\`\`\`js\n${Output.numbers.join(" ")}\n\`\`\`\n`:""}Memory: \n\`\`\`js\n${Mem.join(",")}\n\`\`\``;

    let embed = bot.embed();

    return msg.channel.send(out);
}
