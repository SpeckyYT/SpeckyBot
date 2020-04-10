const { join } = require('path');

module.exports = (bot) => {
    bot.reload = (module) => {
        const begin = new Date();

        const bfsdir = join(process.cwd(),`handlers/botfunctions.js`);
        const cmddir = join(process.cwd(),`handlers/commands.js`);
        const eventdir = join(process.cwd(),`handlers/events.js`);
        const consdir = join(process.cwd(),`handlers/console.js`);

        try{
            switch(module){
                case "botfunctions":
                case "botfunction":
                case "botf":
                case "bfs":
                case "bf":
                    bot.require(bfsdir)(bot); break;
                case "events":
                case "event":
                case "evnts":
                case "evnt":
                    bot.require(eventdir)(bot); break;
                case "commands":
                case "command":
                case "cmds":
                case "cmd":
                    bot.require(cmddir)(bot); break;
                case "console":
                case "cons":
                    bot.require(consdir)(bot); break;
                default:
                    bot.require(bfsdir)(bot);
                    bot.require(eventdir)(bot);
                    bot.require(cmddir)(bot);
                    bot.require(consdir)(bot); break;
            }
            console.log("Loading done!".success)
        }catch(e){
            console.log(`ERROR: ${e.message}`.error);
            return {time:false}
        }
        const end = new Date();
        const time = end - begin;

        return {time}
    }
}
