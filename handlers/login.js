module.exports = async (bot) => {
    const { token, prefix } = bot.config;
        
    bot.login(token)
    .then(() => {
        bot.log(`Bot prefix: ${prefix}`.startupinfo);
        bot.log(`Logged as ${bot.user.tag}!`.startupinfo)
    })
    .catch(async () => {
        await Array(25).forEach(() => {
            console.log(`PLEASE EDIT THE CONFIG.JSON FILE (token is incorrect or can't login to discord)`.error)
        })
        if(token == "TOKEN_HERE"){
            process.exit(0)
        }
    })
}
