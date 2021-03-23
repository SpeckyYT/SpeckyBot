module.exports = (bot) => {
    bot.getCommand = (command) => {
        return bot.commands.get(command) || bot.commands.get(bot.aliases.get(command));
    }

    bot.getConsoleCommand = (command) => {
        return bot.console.get(command) || bot.console.get(bot.consoleali.get(command));
    }

    bot.getFunction = (cmd) => {
        return (typeof cmd == 'object') ? cmd[Object.keys(cmd).filter(v => typeof cmd[v] == 'function')[0]] : async ()=>{};
    }
}
