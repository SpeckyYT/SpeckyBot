module.exports = (bot) => {
    bot.bf = async (insts, options) => {
        options = options || {};

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
                await new Promise(res => bot.setImmediate(res));
                if (new Date().getTime() > (start+TIME_LIMIT)){
                    tOut = true;
                    break;
                }

                if(typeof memory[cell] != "number"){
                    memory.push(0);
                }

                const c = instructions[pos];

                if (c == '['){
                    if(memory[cell]){
                        loops.push(pos);
                    }else{
                        skip++
                    }
                    pos++;
                    continue;
                }

                if (c == ']'){
                    if(memory[cell]){
                        pos = loops[loops.length-1];
                    }else{
                        if(skip > 0){
                            skip--;
                        }else{
                            loops.pop();
                        }
                    }
                    pos++;
                    continue;
                }

                pos++;
                if(skip > 0) continue;

                if (c == '+'){
                    if(memory[cell]+1 >= MEM_SIZE){
                        memory[cell] = 0;
                    }else{
                        memory[cell]++;
                    }
                    continue;
                }

                if (c == '-'){
                    if(memory[cell]-1 < 0){
                        memory[cell] = MEM_SIZE-1;
                    }else{
                        memory[cell]--;
                    }
                    continue;
                }

                if (c == '>'){
                    if(cell+1 > MEM_LENGTH){
                        cell = MEM_LENGTH;
                    }else{
                        cell++;
                    }
                    continue;
                }

                if (c == '<'){
                    if(cell-1 < 0){
                        cell = 0;
                    }else{
                        cell--;
                    }
                    continue;
                }

                if (c == '.'){
                    output.string.push(String.fromCharCode(memory[cell]));
                    output.numbers.push(memory[cell]);
                    continue;
                }

                if (!options.extra) continue;

                if (c == ';'){
                    memory[cell] = Math.round(Math.random());
                }

                if (c == '_'){
                    memory[cell] = 0;
                }

                if (c == '\\'){
                    cell = 0;
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
