module.exports = {
    name: "shutdown",
	description: "Shuts the bot down!",
    usage: ``,
    category: `owner`,
	accessableby: "Bot Owner",
    aliases: ["quit","exit","die","kill","reboot"]
}

module.exports.run = async (bot, msg) => {
    try{
        await msg.channel.send("Bot is shutting down!")
        .then(ms => {
            ms.delete(5000);
            process.exit();
        });
    }catch(e){
        return bot.cmdError("An error occourred");
    }
}
