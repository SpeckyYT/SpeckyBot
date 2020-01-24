const config = require('../../config.json')

module.exports = async bot => {
    let statuses = [
        `${bot.guilds.size} servers!`,
        `${config.prefix}help`,
        `${config.prefix}invite`,
        `over ${bot.users.size} users!`
    ]

    setInterval(function() {
        let status = statuses[Math.floor(Math.random() * statuses.length)];
        bot.user.setActivity(status, {type: "WATCHING", url:"https://www.twitch.tv/SpeckyYT"});
    }, 30000)
}

module.exports.config = {
    event: "ready"
}
