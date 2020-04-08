module.exports = (bot) => {
    bot.loadSettings = async (bot) => {
        ['user','server'].forEach(f => {
            delete require.cache[require.resolve(`../../db/${f.charAt(0)}_settings.json`)];
            try{
                bot.settings[f] = require(`../../db/${f.charAt(0)}_settings.json`);
            }catch(err){
                console.log(`Your db/${f.charAt(0)}_settings.json file looks like to be corrupted.\nPlease fix it before it becomes an issue.`.error)
            }
        })
    }

    bot.loadConfig = (bot) => {
        delete require.cache[require.resolve('../../config.json')];
        try{
            bot.config = require('../../config.json');
        }catch(err){
            console.log("YOUR CONFIG.JSON FILE LOOKS LIKE TO BE CORRUPTED!\nPLEASE FIX IT BEFORE IT BECOMES AN ISSUE.".fatal)
        }
    }
}