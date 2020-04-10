module.exports = (bot) => {
    bot.reload = (module) => {
        const begin = new Date();

        const cmddir = `../handlers/commands.js`;
        const eventdir = `../handlers/events.js`;
        const consdir = `../handlers/console.js`;
        const bfsdir = `../handlers/botfunctions.js`;

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
                    bot.require(bfsdir)(bot); break;
                    bot.require(eventdir)(bot);
                    bot.require(cmddir)(bot);
                    bot.require(consdir)(bot); break;
            }
        }catch(e){
            console.log(`ERROR: ${e.message}`.error);
            return {time:false}
        }
        const end = new Date();
        const time = end - begin;

        return {time}
    }
}
