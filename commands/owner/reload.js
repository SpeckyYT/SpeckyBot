module.exports = {
    name: "reload",
	description: "The bot will reload a specific handler!",
    usage: `<handler>`,
    category: `owner`,
	accessableby: "Bot Owner",
    aliases: ["rld","rl"]
}

const { Collection } = require("discord.js");
//const nodegit = require('nodegit');
//const path = require("path");

module.exports.run = async (bot, msg) => {
    let { args } = msg;
    if(!args[0]) return msg.channel.send("You have to define an handler to reload")
    var begin = new Date().getTime();

    const cmddir = `../../handlers/commands.js`;
    const eventdir = `../../handlers/events.js`;
    const consdir = `../../handlers/console.js`;

    try{
        switch(args[0]){
            case "commands":
            case "command":
            case "cmds":
            case "cmd":
                delete require.cache;
                bot.commands = new Collection();
                bot.aliases = new Collection();
                require(cmddir)(bot);
                break
            case "events":
            case "event":
            case "eve":
            case "ev":
                delete require.cache;
                require(eventdir)(bot);
                break
            case "console":
            case "cons":
                delete require.cache;
                require(consdir)(bot);    
                break
            default:
                return msg.channel.send("Module to reload is invalid")
        }
    }catch(e){
        console.log(`ERROR: ${e.message}`);
        return
    }
    const end = new Date().getTime();
    const diff = end - begin;
    msg.channel.send(`**${args[0]}** got reloaded! (${diff}ms)`).then(ms => ms.delete(10000)).catch()
    msg.delete(5000)
}
