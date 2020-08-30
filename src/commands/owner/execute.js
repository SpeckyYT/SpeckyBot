module.exports = {
    name: "execute",
    description: "Executes all commands given in the message's content!",
    usage: "<command> <command> <command> ...",
    category: "owner",
    aliases: ["exec","exe","ex"]
}

module.exports.run = async (bot, msg) => {
    return msg.args.forEach(async command => {
        const cmd = bot.getCommand(command);
        if(cmd){
            return await (bot.getFunction(cmd))(bot, msg).catch(()=>{});
        }else{
            return bot.cmdError(`Command ${cmd} doesn't exist`);
        }
    })
}
