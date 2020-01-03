module.exports.run = async (bot, msg) => {
    let { args } = msg;
    const playing = args[0];
    const game = msg.content.split(" ").slice(2).join(" ");
    try{
        bot.user.setPresence({game: {name: `${game}`, type: `${playing}`}});
    }catch(e){
        msg.channel.send("An error occurred");
    }
};

module.exports.config = {
    name: "playing",
	description: "Some stuff for the bot's presence",
    usage: `<Playing> <Game>`,
    category: `owner`,
	accessableby: "Bot Owner",
    aliases: ["presence","game"]
}