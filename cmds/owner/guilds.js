module.exports.run = async (bot, msg, args, owner, prefix) => {
    if(!(msg.author.id === owner)){
        msg.channel.send("You aren't my owner.");
        return;
    }
    var i;
    for(i = 0; i < bot.guilds.length; i++){
        msg.channel.send(`${bot.guilds[i]}`);
    }
    msg.channel.send(`Finish`);
    msg.channel.send(`${bot.guilds.array[0]} guilds found`);
}

module.exports.config = {
    name: "guilds",
	description: "Gets all servers IDs in which the bot is present!",
	usage: ``,
	accessableby: "Bot Owner",
    aliases: ["guild","gilds","gild"]
}