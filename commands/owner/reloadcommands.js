module.exports.run = async (bot, msg, args, owner, prefix) => {
    if(!(msg.author.id === owner)){
        msg.channel.send("You aren't my owner.");
        return;
    }
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
    msg.channel.send('Every command got reloaded!')
}

module.exports.config = {
    name: "reloadcommands",
	description: "The bot will reload all commands!",
    usage: ``,
    category: `owner`,
	accessableby: "Bot Owner",
    aliases: ["rlc","ulc","rc"]
}
