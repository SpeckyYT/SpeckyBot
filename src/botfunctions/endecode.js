module.exports = (bot) => {
    bot.encrypt = (input, log) => {
        if(!input){
            return "";
        }

        let inout = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789()[]{}!\"§$%&/()=?`´*-+<>\\#'_^°~,.;:|".split('');
        if(inout.length % 2){
            inout = inout.pop();
        }
        let coppy = [];

        const content = input.split('').filter(v=>inout.includes(v)).join('');

        let i = 0;
        while(inout.length-coppy.length > 0){
            const pos = (content.length * 5 + i) % inout.length;
            coppy.push(inout[pos]);
            inout[pos] = null;
            inout = inout.clean();
            i++;
        }

        inout = inout.clean();
        coppy = coppy.clean();

        if(log) console.table([inout,coppy]);

        let output = '';

        content.split('').forEach(v=>{
            if(inout.includes(v)){
                output += coppy[inout.indexOf(v)];
            }else if(coppy.includes(v)){
                output += inout[coppy.indexOf(v)];
            }
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