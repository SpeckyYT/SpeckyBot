const { Client, Collection } = require("discord.js");

module.exports = () => {
    const bot = new Client({autoReconnect:true});
    require('./missingdirectories')();
    require('./missingfiles')();
    require('./botloader')();
    
    const { token } = require('../config.json')
        
    bot.login(token).catch(() => {
        for(var i = 0; i < 50; i++){
            console.log(`PLEASE EDIT THE CONFIG.JSON FILE (token is incorrect or can't login to discord)`)
        }
    })
}
