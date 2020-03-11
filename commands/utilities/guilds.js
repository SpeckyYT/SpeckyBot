module.exports = {
    name: "guilds",
	description: "How many servers does this bot know?",
    usage: ``,
    category: `utilities`,
	accessableby: "Members",
    aliases: ["servers"]
}

module.exports.run = async (bot, msg) => {
    let { args } = msg;

    if(bot.checkOwner(msg.author.id) && args[0] == "yes"){
        bot.guilds.forEach(server => {
            msg.channel.send(`${server.name} (${server.id})`);
        })
    }

    const embed = bot.embed()
        .addBlankField()
        .addField(`Servers Count:`, bot.guilds.size)
        .addBlankField();
    msg.channel.send(embed);
}
