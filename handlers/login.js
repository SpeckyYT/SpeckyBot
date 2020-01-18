module.exports = async (bot) => {
    const { token, prefix } = require('../config.json')
        
    await bot.login(token).catch(() => {
        for(var i = 0; i < 25; i++){
            console.log(`PLEASE EDIT THE CONFIG.JSON FILE (token is incorrect or can't login to discord)`)
        }
        process.exit()
    })

    bot.log(`Bot prefix: ${prefix}`);
}
