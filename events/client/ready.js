module.exports = async bot => {
    console.log(`Logged as ${bot.user.tag}!`)
    bot.user.setActivity(`Bot is Online!`, {type: "STREAMING", url:"https://twitch.tv/SpeckyYT"});

    let statuses = [
        `${bot.guilds.size} servers!`,
        "!help",
        `over ${bot.users.size} users!`
    ]

    setInterval(function() {
        let status = statuses[Math.floor(Math.random() * statuses.length)];
        bot.user.setActivity(status, {type: "WATCHING", url:"https://twitch.tv/SpeckyYT"});
    }, 5000)

}