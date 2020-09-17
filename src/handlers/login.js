module.exports = async (bot) => {
    const { token, prefix } = bot.config;

    return bot.login(token)
    .then(() => {
        bot.log(`Bot prefix: ${prefix}`.startupinfo);
        bot.log(`Logged as ${bot.user.tag}!`.startupinfo);
    })
    .catch(async () => {
        if(token == "TOKEN_HERE"){
            console.log("PLEASE EDIT THE CONFIG.JSON FILE (token is invalid)".error);
            throw process.exit(0);
        }else{
            console.log("WASN'T ABLE TO LOGIN IN DISCORD (wrong token or bad connection)".error);
        }
    });
}
