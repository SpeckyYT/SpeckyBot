module.exports = (bot) => {
    bot.encrypt = (input, log) => {
        if(!input){
            return "";
        }

        let inout = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789()[]{}!\"§$%&/=?`´*-+<>\\#'_^°~,.;:|"];
        if(inout.length % 2){
            inout.pop();
        }
        let coppy = [];

        const content = input.split('').filter(v=>inout.includes(v)).join('');

        let i = 0;
        while(coppy.length < inout.length){
            const pos = (content.length * 5 + Math.floor(inout.length / 2) + i*i) % inout.length;
            coppy.push(inout[pos]);
            inout = inout.delete(pos);
            i++;
        }

        inout = inout.clean();
        coppy = coppy.clean();

        if(log) console.table([inout,coppy]);

        let output = '';

        [...content].forEach(v=>{
            if(inout.includes(v)){
                output += coppy[inout.indexOf(v)];
            }else if(coppy.includes(v)){
                output += inout[coppy.indexOf(v)];
            }

            // This will shift the second array after each requested letter
            coppy.unshift('');
            coppy[0] = coppy[coppy.length-1];
            coppy.pop();

            if(input[output.length] === ' '){
                output += ' ';
            }
        });

        return output;
    }
    bot.decrypt = bot.encrypt;
    bot.encode = bot.encrypt;
    bot.decode = bot.encrypt;
}
