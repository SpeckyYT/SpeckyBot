module.exports = {
    name: "repeat",
    description: "Repeats a command `n` times!",
    usage: `<command> <number> [content]`,
    category: `owner`,
    accessableby: "Bot Owner",
    aliases: ["rpt"]
}

module.exports.run = async (bot, msg) => {
    const numb = msg.args.filter(v => {
        const res = v.match(/[0-9]+/g);
        if(res){
            return Boolean(res.length);
        }
        return false;
    })[0];
    const command = msg.args.filter(v => {
        const res = v.match(/[^0-9]+/g);
        if(res){
            return Boolean(res.length);
        }
        return false;
    })[0];

    msg.content = msg.content.replace(numb,'').replace(command,'').trim();

    const cmd = bot.getCommand(command);

    if(cmd){
        for(let i=0; i<Number(numb); i++){
            await (bot.getFunction(cmd))(bot, msg).catch(()=>{})
        }
    }else{
        return bot.cmdError("Command doesn't exist")
    }
}
