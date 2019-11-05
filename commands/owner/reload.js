var mys = require('microseconds');

module.exports.run = async (bot, msg, args, owner, prefix) => {
    if(!(msg.author.id === owner)){
        msg.channel.send("You aren't my owner.");
        return;
    }
    if(!args[0]) return msg.channel.send("You have to define an handler to reload")
    const begin = mys.now();
    const cmddir = '../../handlers/commands';
    const eventdir = '../../handlers/events';
    const consdir = '../../handlers/console';
    try{
        switch(args[0]){
            case "commands":
            case "command":
            case "cmds":
            case "cmd":
                bot.commands.forEach(c => {
                    bot.commands.delete(c);
                });
                bot.aliases.forEach(a => {
                    bot.commands.delete(a);
                });
                require(cmddir)(bot);
                break
            
            case "events":
            case "event":
            case "eve":
            case "ev":
                delete require.cache[require.resolve(eventdir)];
                require(eventdir)(bot);
                break

            case "console":
            case "cons":
                delete require.cache[require.resolve(consdir)];
                require(consdir)(bot);    
                break
                
            default:
                msg.channel.send("Action is invalid")
        }
    }catch(e){
        msg.channel.send(`ERROR: ${e.message}`);
    }
    const end = mys.now();
    const diff = end - begin;
    msg.channel.send(`Every event got reloaded! (${parseFloat(diff/1000).toFixed(3)}ms)`)
}

module.exports.config = {
    name: "reload",
	description: "The bot will reload all events!",
    usage: `<type>`,
    category: `owner`,
	accessableby: "Bot Owner",
    aliases: ["rld","rl"]
}
