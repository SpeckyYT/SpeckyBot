module.exports = {
    name: "playing",
    description: "Some stuff for the bot's presence",
    usage: `<Playing> <Game>`,
    category: "owner",
    aliases: ["presence","game"]
}

module.exports.run = async (bot, msg) => {
    const { args } = msg;
    const playing = args[0];
    const game = msg.cmdContent.split(" ").slice(2).join(" ");
    try{
        bot.user.setPresence({game: {name: `${game}`, type: `${playing}`}});
    }catch(e){
        msg.channel.send("An error occurred");
    }
}
