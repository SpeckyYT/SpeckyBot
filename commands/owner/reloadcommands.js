var mys = require('microseconds');

module.exports.run = async (bot, msg, args, owner, prefix) => {
    if(!(msg.author.id === owner)){
        msg.channel.send("You aren't my owner.");
        return;
    }
    const begin = mys.now();
    try{
        bot.commands.forEach(c => {
            bot.commands.delete(c);
        });
        bot.aliases.forEach(a => {
            bot.commands.delete(a);
        });
        require(`../../handlers/commands`)(bot);
    }catch(e){
        msg.channel.send(`ERROR: ${e}`);
    }
    const end = mys.now();
    const diff = end - begin;
    msg.channel.send(`Every command got reloaded! (${parseFloat(diff/1000).toFixed(3)}ms)`)
}

module.exports.config = {
    name: "reloadcommands",
	description: "The bot will reload all commands!",
    usage: ``,
    category: `owner`,
	accessableby: "Bot Owner",
    aliases: ["rlc","ulc","rc"]
}
