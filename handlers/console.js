const { readdirSync } = require('fs')

module.exports = async (bot) => {

    let ccommands = readdirSync(`./console/`).filter(d => d.endsWith('.js'));
    ccommands.forEach(async file => {
        try{
            let pull = require(`../console/${file}`);
            bot.console.set(pull.name, pull);
            if (pull.aliases) pull.aliases.forEach(a => bot.consoleali.set(a, pull.name));
            bot.log(`${file}`.debug);
        }catch(err){
            bot.log(`${file} ERROR!`.error);
            bot.log(err.message.error);
        }
    })


    process.openStdin().addListener("data", res => {
        let args = res.toString().split(/\s/g).clean();
        
        if(!args[0]) return;

        let command = args[0].toLowerCase();

        args = args.slice(1)

        let cmd = bot.console.get(command) || bot.console.get(bot.consoleali.get(command));

        if(cmd){
            cmd.run(bot,args)
            .then(() => {
                if(bot.cache.console.debug){
                    console.log(`Command ${command.toUpperCase()} runned successfully!`.success)
                }
            })
            .catch(err => {
                if(err){
                    if(err.message){
                        err = err.message
                    }
                    console.log(err.replace('[EXPECTED] ','').trim().error)
                }else{
                    console.log("Unexpected error happend".error)
                }
            })
        }else{
            console.log(`Command ${command.toUpperCase()} not found`.error)
        }
    });
}