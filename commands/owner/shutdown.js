module.exports.run = async (bot, msg, args, owner, prefix) => {
    if(!(msg.author.id === owner)){
        msg.channel.send("You aren't my owner.");
        return;
    }
    try{
        await msg.channel.send("Bot is shutting down!");
        process.exit();
    }catch(e){
        msg.channel.send("An error occourred");
    }
}

module.exports.config = {
    name: "shutdown",
	description: "Shuts the bot down!",
    usage: ``,
    category: `owner`,
	accessableby: "Bot Owner",
    aliases: ["quit","exit","die","reboot"]
}