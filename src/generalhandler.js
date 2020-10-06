const { readdirSync } = require('fs');
const { join } = require('path');

module.exports = async (bot) => {
    function load(handlers){
        for(let handler of handlers){

            let log;
            if(bot.log){
                log = bot.log;
            }else{
                log = console.log;
            }

            let loading = `\n\nLoading ${handler.toUpperCase()}!\n`;

            if('_'.dependency){
                loading = loading.dependency;
            }

            log(loading);

            try{
                require(join(process.cwd(),'handlers',handler))(bot);
            }catch(err){
                console.log(`handler\t${handler}`.toUpperCase().error);
                console.log("FATAL ERROR ON HANDLERS".fatal);
                console.error(err);
                process.exit(1);
            }
        }
    }

    const priority = [
        "clean",
        "dependencies",
        "languages",
        "botcache",
        "botfunctions",
        "missingdirectories",
        "missingfiles",
        "confighandler",
        "login",
        "botfunctionsextra",
        "prototypes",
        "modules",
        "events"
    ];

    load(priority);

    load(
        [
            ...readdirSync(join(process.cwd(),'handlers')).map(v => priority && v.match(bot.supportedFiles).length > 0 && !priority.includes(v.replace(bot.supportedFiles,'')) ? v.replace(bot.supportedFiles,'') : null).clean()
        ]
    );
}
