module.exports = {
    name: "guilds",
    description: "How many servers does this bot know?",
    category: "utilities",
    aliases: ["servers"]
}

module.exports.run = async (bot, msg) => {
    const { args } = msg;

    if(msg.author.id.isOwner() && args[0] == "yes"){
        bot.guilds.cache.forEach(server => {
            msg.channel.send(`${server.name} (${server.id})`);
        })
    }

    const embed = bot.embed()
    .addField(`Servers Count:`, bot.guilds.cache.size);
    msg.channel.send(embed);
}
