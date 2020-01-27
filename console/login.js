module.exports = {
    name: 'login',
    aliases: []
}

module.exports.run = async (bot, args) => {
    if(!args[0]) {
        return console.log("No token provided!".error)
    }

    bot.login(args[0])
    .then(() => {
        console.log("Logged successfully!".success);
    })
    .catch(() => {
        console.log("Logged without success".fail);
        bot.login(bot.config.token).catch(()=>{
            console.log("WASN'T ABLE TO LOG BACK TO THE MAIN TOKEN!".fatal);
            process.exit(1)
        })
    })
}
