module.exports = (bot) => {
    bot.getCommand = (command) =>
        bot.commands.get(command) || bot.commands.get(bot.aliases.get(command));

    bot.getConsoleCommand = (command) =>
        bot.console.get(command) || bot.console.get(bot.consoleali.get(command));

    bot.getFunction = (cmd) =>
        (typeof cmd == 'object') ? cmd[Object.keys(cmd).filter(v => typeof cmd[v] == 'function')[0]] : async ()=>{};
}
