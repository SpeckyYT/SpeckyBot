module.exports = async bot => {
    console.log(`Logged as ${bot.user.tag}!`)
    bot.user.setActivity(`Bot is Online!`, {type: "STREAMING", url:"https://www.twitch.tv/SpeckyYT"});

    let statuses = [
        `${bot.guilds.size} servers!`,
        `sb!help`,
        `over ${bot.users.size} users!`
    ]

    setInterval(function() {
        let status = statuses[Math.floor(Math.random() * statuses.length)];
        bot.user.setActivity(status, {type: "WATCHING", url:"https://github.com/Specky-Projects/SpeckyBot"});
    }, 10000)

}