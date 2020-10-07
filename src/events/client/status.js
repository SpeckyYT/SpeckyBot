module.exports = {
    event: "interval_10_sec"
}

module.exports.call = async (bot) => {
    const statuses = [
        `${bot.guilds.cache.size} servers!`,
        `${bot.config.prefix}help`,
        `${bot.config.prefix}invite`,
        `over ${bot.users.cache.size} users!`,
        `${bot.commands.size} commands!`
    ];

    bot.user.setActivity(statuses.pick(), {type: "WATCHING", url:"https://github.com/SpeckyYT/SpeckyBot"});
}
