module.exports = {
    name: "users",
    description: "How many people does this bot know?",
    category: "utilities"
}

module.exports.run = async (bot, msg) => {
    const embed = bot.embed()
    .addField(`Total Users Count:`, `${bot.users.cache.size}`);
    msg.channel.send(embed);
}
