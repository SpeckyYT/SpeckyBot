module.exports = {
    name: 'reload',
    aliases: ['rl','rld']
}

module.exports.run = async (bot, data) => {
    let { args } = data;
    if(!args[0]) return console.log("You have to define an handler to reload".error);
    const begin = new Date();

    const cmddir = `../handlers/commands.js`;
    const eventdir = `../handlers/events.js`;
    const consdir = `../handlers/console.js`;

    try{
        switch(args[0]){
            case "all":
                bot.require(eventdir)(bot);
                bot.require(cmddir)(bot);
                bot.require(consdir)(bot); break;
            case "commands":
            case "command":
            case "cmds":
            case "cmd":
                bot.require(cmddir)(bot); break;
            case "events":
            case "event":
            case "evnts":
            case "evnt":
                bot.require(eventdir)(bot); break;
            case "console":
            case "cons":
                bot.require(consdir)(bot); break;
            default:
                return bot.cmdError("Module to reload is invalid");
        }
    }catch(e){
        console.log(`ERROR: ${e.message}`.error);
        return
    }
    const end = new Date();
    const diff = end - begin;
    console.log(`${String(args[0]).bold} got reloaded! (${diff}ms)`.success);
}