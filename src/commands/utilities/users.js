module.exports = {
    name: "users",
    description: "How many people does this bot know?",
    usage: ``,
    category: `utilities`,
    accessableby: "Members",
    aliases: []
}

module.exports.run = async (bot, msg) => {
    const embed = bot.embed()
    .addField(`Total Users Count:`, `${bot.users.size}`);
    msg.channel.send(embed);
}
