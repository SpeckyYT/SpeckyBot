const { setStatus } = require('discord.js')

module.exports.run = async (bot, msg, args, owner, prefix) => {
    if(!(msg.author.id === owner)){
        msg.channel.send("You aren't my owner.");
        return;
    }
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