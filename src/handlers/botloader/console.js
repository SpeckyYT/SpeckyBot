const { readdirSync } = require('fs');
const { Collection } = require('discord.js');
const promisify = require('promisify-func');

module.exports = async (bot) => {
    bot.console = new Collection();
    bot.consoleali = new Collection();

    readdirSync(`./console/`)
    .filter(d => d.match(bot.supportedFiles))
    .forEach(async file => {
        try{
            const pull = bot.require(`./console/${file}`);
            bot.console.set(pull.name, pull);
            if (pull.aliases) pull.aliases.forEach(a => bot.consoleali.set(a, pull.name));
            bot.log(`${file}`.debug);
        }catch(err){
            bot.log(`${file} ERROR!`.error);
            bot.log(err.message.error);
        }
    })

    process.openStdin().removeAllListeners();

    process.openStdin().addListener("data", async res => {
        const content = res.toString();
        let oargs = res.toString().split(/\s/g).clean();

        if(!oargs[0]) return;

        const regex = /^[^0-9a-zA-Z]+/g

        const matches = oargs[0].match(regex)

        if(matches){
            oargs[0] = oargs[0].slice(matches[0].length)
            oargs.unshift(matches[0])
        }

        oargs = oargs.clean();

        const command = oargs[0].toLowerCase();

        const args = oargs.slice(1);

        const cmd = bot.getConsoleCommand(command);

        const data = {}
        data.contento = content;
        data.content = content.slice(command.length).trim();
        data.ARGS = args.toUpperCase();
        data.Args = args;
        data.args = args.toLowerCase();
        data.timeStamp = new Date();

        if(cmd){
            if(typeof bot.getFunction(cmd) != 'function'){
                return console.log(`Command ${command.toUpperCase()} not found`.error)
            }
            promisify(bot.getFunction(cmd))(bot,data)
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
            .then(() => {
                if(bot.cache.console.debug){
                    console.log(`Command ${command.toUpperCase()} runned successfully!`.success)
                }
            })
        }else{
            const search = bot.console.get('searchchannel');

            data.args[0] = command;

            search.run(bot,data)
            .catch(async () => {
                const draw = bot.console.get('draw');
                data.content = data.contento;
                return await draw.run(bot,data);
            })
            .catch(() => {
                console.log(`Command ${command.toUpperCase()} not found`.error)
            })
        }
    })
}
