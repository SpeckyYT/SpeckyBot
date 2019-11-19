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

    let cs = bot.commands.get('checkserver');
    let cu = bot.commands.get('checkusers');
    cs.run(bot)

    setInterval(function() {
        cs.run(bot)
    }, 300000)
}

module.exports.config = {
    event: "ready"
}