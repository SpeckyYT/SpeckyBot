module.exports.run = async (bot, msg, args, owner, prefix) => {
    if(!(msg.author.id === owner)){
        msg.channel.send("You aren't my owner.");
        return;
    }
    if(!args[0]) return msg.channel.send("You have to define a server");
    guild = bot.guilds.get(args[0]);
    try{
        if(guild.avaiable){
           guild.leave();
           msg.channel.send("It should have worked!")
        }else{
           msg.channel.send("The server is unavailable.")
        }
    }catch(e){
        msg.channel.send("An error occourred")
    }
}

module.exports.config = {
    name: "leaveserver",
	description: "The bot will leave the desired server!",
    usage: `<serverID>`,
    category: `owner`,
	accessableby: "Bot Owner",
    aliases: ["ls","sl","serverleave"]
}
