module.exports = {
    name: "guilds",
    description: "How many servers does this bot know?",
    usage: "",
    category: `utilities`,
    aliases: ["servers"]
}

module.exports.run = async (bot, msg) => {
    const { args } = msg;

    if(msg.author.id.isOwner() && args[0] == "yes"){
        bot.guilds.forEach(server => {
            msg.channel.send(`${server.name} (${server.id})`);
        })
    }

    const embed = bot.embed()
    .addField(`Servers Count:`, bot.guilds.size);
    msg.channel.send(embed);
}
