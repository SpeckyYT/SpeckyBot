module.exports = {
    event: "ready"
}

module.exports.call = async bot => {
    console.log("Bot is ready!".success);

    let statuses = {
        normal: [
        `${bot.guilds.size} servers!`,
        `${bot.config.prefix}help`,
        `${bot.config.prefix}invite`,
        `over ${bot.users.size} users!`
        ],
        corona: [
        `${bot.guilds.size} countries infected`,
        `${bot.config.prefix}help for surviving`,
        `${bot.config.prefix}invite`,
        `${bot.users.size} users infected`
        ]
    }

    let status = "corona";

    setInterval(function() {
        try{
            bot.user.setActivity(statuses[status].pick(), {type: "WATCHING", url:"https://www.twitch.tv/SpeckyYT"});
        }catch(e){}
    }, 30000)
}
