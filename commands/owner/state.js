module.exports = {
    name: "state",
	description: "Some stuff for the bot's presence",
    usage: `<State>`,
    category: `owner`,
	accessableby: "Bot Owner",
    aliases: []
}

module.exports.run = async (bot, msg) => {
    let { args } = msg;
    const state = args[0];
    try{
        bot.user.setStatus(state).then().catch();
        msg.channel.send("should have been working bruh");
    }catch(e){
        msg.channel.send("An error occurred");
    }
}
