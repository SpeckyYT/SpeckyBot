const { floor, cos, tan, abs } = require('mathjs');

module.exports = (bot) => {
    bot.encrypt = (input, log) => {
        input = input || '';

        let inout = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789()[]{}!\"§$%&/=?`´*-+<>\\#'_^°~,.;:|@€"];
        const coppy = [];

        if(inout.length % 2) inout.pop();

        const whitespaces = [' ','\n'];

        const spacont = [...input]
        .filter(v => [...inout,...whitespaces].includes(v))
        .join('')
        .trim()
        .replace(/(\s|\n)+/g,'$1')
        .split('');

        const content = [...spacont]
        .filter(v => inout.includes(v))
        .join('');

        const getIndex = (letter) =>
            inout.includes(letter) ? inout.indexOf(letter) : (coppy.includes(letter) ? coppy.indexOf(letter) : 0);

        const getOppositeLetter = (letter) =>
            inout.includes(letter) ? coppy[getIndex(letter)] : (coppy.includes(letter) ? inout[getIndex(letter)] : '');

        const change = (eq1,eq2) => {
            eq1 = floor(isNaN(eq1) ? 0 : abs(eq1)) % inout.length;
            eq2 = floor(isNaN(eq2) ? 0 : abs(eq2)) % coppy.length;
            [inout[eq1],coppy[eq2]] = [coppy[eq2],inout[eq1]];
        }

        // Will pick some random characters from the first array and pushes it to the second one
        for(let i = 0; coppy.length < inout.length; i++){
            const pos = (content.length * 5 + floor(inout.length / 2) + i*i) % inout.length;
            coppy.push(inout[pos]);
            inout = inout.delete(pos);
        }

        if(log) console.table([inout,coppy]);

        let output = '';

        [...content].forEach((v,i) => {
            // Gets the letter from one or the other array
            const char = getIndex(v);
            output += getOppositeLetter(v);

            // Manages white spaces
            if(whitespaces.includes(spacont[output.length])){
                output += spacont[output.length];
            }

            // This will shift the second array after each requested letter
            coppy.unshift(coppy[coppy.length-1]);
            coppy.pop();
            // This will push the first array after every 2 requested letters (but not the 3th)
            if(i % 3){
                inout.push(inout[0]);
                inout.shift();
            }

            // This shuffles the arrays for the character's position
            // (changing one letter may result in total chaos after it)
            for(let j = 0; j < char; j++){
                change(
                    j,
                    char
                );
                change(
                    j^(inout.length-1),
                    j
                );
                change(
                    j*j+(inout.length/2),
                    j*4+(coppy.length/3)
                );
            }
            // This shuffles the arrays with some arbitrary formulas
            change(0,i+1);
            change(i+2,i+5);
            change(i*3,i*5);
            change(i+1,i*2);
            change(i*i,i*8);
            change(tan(i*7)*50,i*3);
            change(i%3*7,(i*420/69+45)/16);
            change(cos(i*7)*inout.length,coppy.length-1);

            // Log
            if(log){
                console.log(i);
                console.table([inout,coppy]);
            }
        });

        return output;
    }
    bot.decrypt = bot.encrypt;
    bot.encode = bot.encrypt;
    bot.decode = bot.encrypt;
}
