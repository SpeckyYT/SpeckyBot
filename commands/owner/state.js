module.exports.run = async (bot, msg, args, config) => {
    const state = args[0];
    try{
        bot.user.setStatus(`idle`).then().catch();
        msg.channel.send("should have been working bruj");
    }catch(e){
        msg.channel.send("An error occurred");
    }
};

module.exports.config = {
    name: "state",
	description: "Some stuff for the bot's presence",
    usage: `<State>`,
    category: `owner`,
	accessableby: "Bot Owner",
    aliases: []
}