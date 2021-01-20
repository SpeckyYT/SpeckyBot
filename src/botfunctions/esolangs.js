module.exports = (bot) => {
    bot.bf = async (insts, options = {}) => {
        const MEM_LENGTH = options.length || 2**32-1;
        const MEM_SIZE = options.size || 2**8;
        const TIME_LIMIT = options.time || 1000; // ms

        let instructions = [];
        const loops = [];
        let skip = 0;
        let pos = 0;
        const output = {
            string: [],
            numbers: []
        };
        let cell = 0;
        const memory = [];

        if(typeof insts == "string"){
            instructions = insts.split('');
        }else if(Array.isArray(insts)){
            insts.forEach(v => {
                if(typeof v == "string"){
                    v.split('').forEach(w => {
                        instructions.push(w);
                    });
                }
            })
        }else{
            return {error: true};
        }

        const start = new Date().getTime();
        let tOut = false;

        return new Promise(async res => {
            while(pos < instructions.length){
                await bot.async();
                if (new Date().getTime() > (start+TIME_LIMIT)){
                    tOut = true;
                    break;
                }

                if(cell >= memory.length) memory.push(0);

                const c = instructions[pos];

                if (c == '['){
                    memory[cell] ? loops.push(pos) : skip++;
                    pos++;
                    continue;
                }

                if (c == ']'){
                    memory[cell] ? pos = loops[loops.length-1] :
                        skip > 0 ? skip-- : loops.pop();
                    pos++;
                    continue;
                }

                pos++;
                if(skip > 0) continue;

                if (c == '+'){
                    memory[cell] + 1 >= MEM_SIZE ? memory[cell] = 0 : memory[cell]++;
                    continue;
                }

                if (c == '-'){
                    memory[cell]-1 < 0 ? memory[cell] = MEM_SIZE-1 : memory[cell]--;
                    continue;
                }

                if (c == '>'){
                    cell+1 > MEM_LENGTH ? cell = MEM_LENGTH : cell++;
                    continue;
                }

                if (c == '<'){
                    cell - 1 < 0 ? cell = 0 : cell--;
                    continue;
                }

                if (c == '.'){
                    output.string.push(String.fromCharCode(memory[cell]));
                    output.numbers.push(memory[cell]);
                    continue;
                }

                if(c == ','){
                    if(!options.msg) continue;
                    const { msg } = options;
                    const m = await msg.channel.send(
                        bot.membed()
                        .setTitle('Brainf*ck')
                        .setDescription(
                            "The code encountered the `,` symbol, " +
                            `which means that you need to input a number from 0 to ${MEM_SIZE-1} (or "c" to cancel)`
                        )
                        .setFooter('Note: the time lost waiting still counts for the timeout')
                    )
                    const res = await msg.channel.awaitMessages(
                        m => m.author.id == msg.author.id &&
                        (parseInt(m.content) >= 0 &&
                        parseInt(m.content) < MEM_SIZE ||
                        m.content.toLowerCase() == 'c'),
                        {
                            max: 1,
                            time: TIME_LIMIT
                        }
                    )
                    await m.delete().catch(()=>{});
                    if(res.size) memory[cell] = parseInt(res.first().content);
                    continue;
                }
            }
            res();
        })
        .then(() => {
            while((options.limit && memory.length > 250) || (memory.last() === 0 && memory.length > 1)){
                memory.pop();
            }

            output.string = output.string.join('');

            const { string } = output;
            const { numbers } = output;

            const end = new Date().getTime();

            const time = end - start;

            return {tOut,output,string,numbers,memory,cell,time}
        })
    }
    bot.brainfuck = bot.bf;
}
