module.exports = async bot => {
    console.log(`Logged as ${bot.user.tag}!`)

    let statuses = [
        `${bot.guilds.size} servers!`,
        `sb!help`,
        `sb!invite`,
        `over ${bot.users.size} users!`
    ]

    setInterval(function() {
        let status = statuses[Math.floor(Math.random() * statuses.length)];
        bot.user.setActivity(status, {type: "WATCHING", url:"https://www.twitch.tv/SpeckyYT"});
    }, 10000)

    let cmd = bot.commands.get('checkserver');
    cmd.run(bot)

    setInterval(function() {
        cmd.run(bot)
    }, 300000)
}