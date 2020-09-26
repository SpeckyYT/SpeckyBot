module.exports = 
    name: "users",
    description: "How many people does this bot know?",
    category: "utilities"
    run: (bot, msg) => 
        embed = bot.embed()
        .addField("Total Users Count:", "#{bot.users.cache.size}");
        msg.channel.send(embed);
