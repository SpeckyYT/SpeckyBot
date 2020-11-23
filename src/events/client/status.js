module.exports = {
    event: "*/15 * * * * *"
}

let lastStatus = '';

module.exports.call = async (bot) => {
    const statuses = [
        `${bot.guilds.cache.size} servers!`,
        `${bot.config.prefix}help`,
        `${bot.config.prefix}invite`,
        `over ${bot.users.cache.size} users!`,
        `${bot.commands.size} commands!`,
        ...bot.cache.statuses
    ];

    let newStatus = lastStatus;

    while(lastStatus == newStatus) newStatus = statuses.pick();

    bot.user.setActivity(newStatus, {type: "WATCHING"});
}
