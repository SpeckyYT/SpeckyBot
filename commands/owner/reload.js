var mys = require('microseconds');
const { readFileSync } = require('fs');


module.exports.run = async (bot, msg, args, config) => {
    if(!args[0]) return msg.channel.send("You have to define an handler to reload")
    var begin = mys.now();
    const cmddir = `../../handlers/commands.js`;
    const eventdir = `../../handlers/events.js`;
    const consdir = `../../handlers/console.js`;
    try{
        switch(args[0]){
            case "commands":
            case "command":
            case "cmds":
            case "cmd":
                await bot.commands.forEach(c => {
                    bot.commands.delete(c);
                });
                await bot.aliases.forEach(a => {
                    bot.commands.delete(a);
                });
                require(cmddir)(bot);
                break
            case "events":
            case "event":
            case "eve":
            case "ev":
                delete require.cache[require.resolve('../../handlers/events.js')];
                require(eventdir)(bot);
                break
            /*
            case "console":
            case "cons":
                await delete require.cache[require.resolve('../handlers/console.js')];
                require(consdir)(bot);    
                break
            */
            case "bot":
            case "git":
            case "repo":
                const rimraf = require('rimraf');
                rimraf('./tmp', {}, () => {})

                const git = require('nodegit');
                await git.Clone("https://github.com/SpeckyYT/SpeckyBot", './tmp')
                .then(() => {
		        setTimeout(() => {
				
                const ncp = require('ncp').ncp;
                ncp("./tmp","./", () => {})

                rimraf('./tmp', {}, () => {})
  
		        }, 5000);	
		})
                break
            case "npm":
            case "modules":
            case "packages":
                const cmd = require('node-cmd');
                cmd.run(`
                    cd ../
                    npm i
                `)
                break
            default:
                return msg.channel.send("Module to reload is invalid")
        }
    }catch(e){
        console.log(`ERROR: ${e.message}`);
        return
    }
    const end = mys.now();
    const diff = end - begin;
    msg.channel.send(`**${args[0]}** got reloaded! (${parseFloat(diff/1000).toFixed(3)}ms)`).then(ms => ms.delete(10000)).catch()
    msg.delete(5000)
}

module.exports.config = {
    name: "reload",
	description: "The bot will reload a specific handler!",
    usage: `<handler>`,
    category: `owner`,
	accessableby: "Bot Owner",
    aliases: ["rld","rl"]
}
