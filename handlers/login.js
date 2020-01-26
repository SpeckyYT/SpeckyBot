module.exports = async (bot) => {
    const { token, prefix } = require('../config.json')
        
    await bot.login(token)
    .then(() => {
        bot.log(`Logged as ${bot.user.tag}!`.data)
    })
    .catch(() => {
        Array(26).forEach(() => {
            console.log(`PLEASE EDIT THE CONFIG.JSON FILE (token is incorrect or can't login to discord)`.error)
        })
        process.exit(0)
    })

    bot.log(`Bot prefix: ${prefix}`.data);
}
