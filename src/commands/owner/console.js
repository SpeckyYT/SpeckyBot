module.exports = {
    name: "console",
    description: "Runs a command on console from Discord!",
    usage: `<command> [args]`,
    category: `owner`,
    accessableby: "Bot Owner",
    aliases: ["cons"]
}

module.exports.run = async (bot, msg) => {
    const command = msg.args[0];
    msg.timeStamp = new Date();
    msg.args = msg.args.slice(1);
    msg.Args = msg.Args.slice(1);
    msg.ARGS = msg.ARGS.slice(1);
    msg.contento = msg.content;
    msg.content = msg.content.slice(command.length).trim();

    const func = bot.getFunction(bot.getConsoleCommand(command));

    if(func){
        bot.log(String(command).toUpperCase().info);
        return await func(bot, msg);
    }else{
        return bot.cmdError("`"+command+"` is not a valid console command");
    }
}
