module.exports = (bot) => {
    bot.loadSettings = async () => {
        ['user','server'].forEach(f => {
            try{
                bot.settings[f] = bot.require(`..\\db\\${f.charAt(0)}_settings`);
            }catch(err){
                // console.log(err)
                console.log(`Your db\\${f.charAt(0)}_settings.json file looks like to be corrupted.\nPlease fix it before it becomes an issue.`.error)
            }
        })
    }

    bot.loadConfig = (bot) => {
        delete require.cache[require.resolve('..\\..\\config.json')];
        try{
            bot.config = require('..\\..\\config.json');
        }catch(err){
            console.log("YOUR CONFIG.JSON FILE LOOKS LIKE TO BE CORRUPTED!\nPLEASE FIX IT BEFORE IT BECOMES AN ISSUE.".fatal)
        }
    }
}
