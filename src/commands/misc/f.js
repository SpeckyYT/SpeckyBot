module.exports = {
    name: "f",
    description: "F",
    usage: `<anything>`,
    category: `misc`,
    accessableby: "Members",
    aliases: []
}

module.exports.run = async (bot, msg) => {
    let thing = msg.Args[0];
    
    if(!thing) return bot.cmdError("You have to include some text or an emote.");

    thing = thing.slice(0,50);

    await msg.channel.send(`${thing}${thing}${thing}${thing}\n${thing}\n${thing}${thing}${thing}${thing}\n${thing}\n${thing}\n${thing}`);
}
