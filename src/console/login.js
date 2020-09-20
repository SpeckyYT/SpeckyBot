module.exports = {
    name: 'login'
}

module.exports.run = async (bot, data) => {
    if(!data.Args[0]) {
        return bot.login(bot.config.token);
    }

    bot.login(data.Args[0])
    .then(() => {
        console.log("Logged successfully!".success);
    })
    .catch(() => {
        console.log("Logged without success".fail);
        bot.login(bot.config.token)
        .catch(()=>{
            console.log("WASN'T ABLE TO LOG BACK TO THE MAIN TOKEN!".fatal);
            process.exit(1)
        })
    })
}
