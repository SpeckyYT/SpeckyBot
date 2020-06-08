const { floor, cos, tan, abs } = require('mathjs');

module.exports = (bot) => {
    bot.encrypt = (input, log) => {
        if(!input){
            return "";
        }

        let inout = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789()[]{}!\"§$%&/=?`´*-+<>\\#'_^°~,.;:|@€"];
        if(inout.length % 2){
            inout.pop();
        }
        const coppy = [];

        const whitespaces = [' ','\n'];
        const spacont = [...input].filter(v=>[...inout,...whitespaces].includes(v));
        const content = spacont.filter(v=>inout.includes(v)).join('');

        for(let i = 0; coppy.length < inout.length; i++){
            const pos = (content.length * 5 + floor(inout.length / 2) + i*i) % inout.length;
            coppy.push(inout[pos]);
            inout = inout.delete(pos);
        }

        if(log) console.table([inout,coppy]);

        let output = '';
        let undeferr = false;

        [...content].forEach((v,i)=>{
            if(inout.includes(undefined) || coppy.includes(undefined)){
                if(!undeferr){
                    console.log(`Endecode: undefined error happened! Index: ${i}`.error);
                    undeferr = true;
                }
                return;
            }

            let char = 0;

            // Gets the letter from one or the other array
            if(inout.includes(v)){
                char = inout.indexOf(v);
                output += coppy[inout.indexOf(v)];
            }else if(coppy.includes(v)){
                char = coppy.indexOf(v);
                output += inout[coppy.indexOf(v)];
            }

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

            // The next lines of code are just to shuffle the two arrays some more
            function change(eq1,eq2){
                eq1 = isNaN(eq1) ? 0 : floor(abs(eq1)) % inout.length;
                eq2 = isNaN(eq2) ? 0 : floor(abs(eq2)) % coppy.length;
                [inout[eq1],coppy[eq2]] = [coppy[eq2],inout[eq1]];
            }
            // This shuffles the arrays for the character's position (changing one letter may result in total chaos after it)
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
            change(
                0,
                i+1
            );
            change(
                i+2,
                i+5
            );
            change(
                i*3,
                i*5
            );
            change(
                i+1,
                i*2
            );
            change(
                i*i,
                i*8
            );
            change(
                tan(i*7)*50,
                i*3
            );
            change(
                i%3*7,
                (i*420/69+45)/16
            );
            change(
                cos(i*7)*inout.length,
                coppy.length-1
            );

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
