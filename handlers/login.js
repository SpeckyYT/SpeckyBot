module.exports = async (bot) => {
    const { token, prefix } = bot.config;
        
    await bot.login(token)
    .then(() => {
        bot.log(`Logged as ${bot.user.tag}!`.startupinfo)
    })
    .catch(() => {
        Array(26).forEach(() => {
            console.log(`PLEASE EDIT THE CONFIG.JSON FILE (token is incorrect or can't login to discord)`.error)
        })
        if(token == "TOKEN_HERE"){
            process.exit(0)
        }
    })

    bot.log(`Bot prefix: ${prefix}`.startupinfo);
}
