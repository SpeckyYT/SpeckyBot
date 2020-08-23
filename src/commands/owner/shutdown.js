module.exports = {
    name: "shutdown",
    description: "Shuts the bot down!",
    usage: "",
    category: `owner`,
    aliases: ["quit","exit","die","kill"]
}

module.exports.run = async (bot, msg) => {
    try{
        await msg.channel.send("Bot is shutting down!");
        process.exit(0);
    }catch(e){
        return bot.cmdError("An error occourred");
    }
}
