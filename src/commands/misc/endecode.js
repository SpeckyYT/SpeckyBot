module.exports = {
    name: "encode",
    description: "Encodes a String that can be decoded in the same way!",
    usage: `<text>`,
    category: `misc`,
    accessableby: "Members",
    aliases: ["decode","encrypt","decrypt"]
}

module.exports.run = async (bot, msg) => {
    let { content } = msg;

    if(content){
        let inout = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789()[]{}!\"§$%&/()=?`´*-+<>\\#'_^°~,.;:|".split('');
        if(inout.length % 2){
            inout = inout.pop();
        }
        let coppy = [];

        content = content.split('').filter(v=>inout.includes(v)).join('');

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

        return msg.channel.send(output.replace(/(\*|\\|`|_|~|\|)/g,'\\$1'));
    }else{
        return bot.cmdError("You have to add some text to encode or decode");
    }
}
