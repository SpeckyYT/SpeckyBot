module.exports = async (bot) => {
    const { token } = require('../config.json')
        
    bot.login(token).catch(() => {
        for(var i = 0; i < 25; i++){
            console.log(`PLEASE EDIT THE CONFIG.JSON FILE (token is incorrect or can't login to discord)`)
        }
    })
}
