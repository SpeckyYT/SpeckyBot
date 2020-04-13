module.exports = (bot) => {
    bot.encrypt = (input) => {
        if(!input){
            return "";
        }

        let inout = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789()[]{}!\"§$%&/()=?`´*-+<>\\#'_^°~,.;:|".split('');
        if(inout.length % 2){
            inout = inout.pop();
        }
        let coppy = [];

        let content = input.split('').filter(v=>inout.includes(v)).join('');

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

        let output = '';

        content.split('').forEach((v)=>{
            if(inout.includes(v)){
                output += coppy[inout.indexOf(v)];
            }else if(coppy.includes(v)){
                output += inout[coppy.indexOf(v)];
            }else if(v === ' '){
                output += ' ';
            }
        });

        return output;
    }
    bot.decrypt = bot.encrypt;
    bot.encode = bot.encrypt;
    bot.decode = bot.encrypt;
}