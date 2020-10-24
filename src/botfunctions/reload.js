const { join } = require('path');

module.exports = (bot) => {
    bot.reload = () => {
        const begin = new Date();

        function load(handlers){
            for(let handler of handlers){

                const log = bot.log || console.log;

                let loading = `\n\nLoading ${handler.toUpperCase()}!\n`;

                if('_'.dependency){
                    loading = loading.dependency;
                }

                log(loading);

                try{
                    bot.require(join(process.cwd(),'handlers',handler))(bot);
                }catch(err){
                    log(`handler\t${handler}`.toUpperCase().error);
                    log("FATAL ERROR ON HANDLERS".fatal);
                    log(err);
                    process.exit(1);
                }
            }
        }

        const reloadable = [
            "dependencies",
            "languages",
            "prototypes",
            "botfunctions",
            "modules",
            "events",
            "templates",
            "commands",
            "console",
            "emotes"
        ];

        load(reloadable);

        const end = new Date();
        const time = end - begin;

        return {time}
    }
}
