module.exports = {
    event: "*/15 * * * * *"
}

let lastStatus = '';

module.exports.call = async (bot) => {
    bot.statuses = bot.statuses || [
        `${bot.guilds.cache.size} servers!`,
        `${bot.config.prefix}help`,
        `${bot.config.prefix}invite`,
        `over ${bot.users.cache.size} users!`,
        `${bot.commands.size} commands!`
    ];

    let newStatus = lastStatus;

    while(lastStatus == newStatus) newStatus = bot.statuses.pick();

    bot.user.setActivity(newStatus, {type: "WATCHING"});
}
