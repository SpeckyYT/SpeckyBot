module.exports.run = async (bot, msg, args, owner) => {
    if(!msg.author.id === owner){
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
    aliases: []
}