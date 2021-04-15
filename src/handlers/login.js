module.exports = (bot) => {
    if(bot.config.token == "TOKEN_HERE")
        return bot.setTimeout(() => {
            console.log("EDIT THE CONFIG.JSON FILE".error);
            process.exit(0);
        }, 1000);

    return bot.login(bot.config.token)
    .then(() => {
        bot.log(`Bot prefix: ${bot.config.prefix}`.startupinfo);
        bot.log(`Logged as ${bot.user.tag}!`.startupinfo);
    })
    .catch(() => {
        bot.log("UNABLE TO LOGIN (wrong token or bad connection)".error);
        process.exit(1);
    });
}
