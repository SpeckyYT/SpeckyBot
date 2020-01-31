module.exports = {
    event: "ready"
}

module.exports.call = async bot => {
    console.log("Bot is ready!".success);

    let statuses = [
        `${bot.guilds.size} servers!`,
        `${bot.config.prefix}help`,
        `${bot.config.prefix}invite`,
        `over ${bot.users.size} users!`
    ]

    setInterval(function() {
        let status = statuses.pick();
        bot.user.setActivity(status, {type: "WATCHING", url:"https://www.twitch.tv/SpeckyYT"});
    }, 30000)
}
