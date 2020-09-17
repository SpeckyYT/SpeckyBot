const { join } = require('path');

module.exports = (bot) => {
    bot.loadSettings = async () => {
        ['user','server'].forEach(f => {
            try{
                bot.settings[f] = bot.require(join(process.cwd(),"..","db",f.charAt(0)+"_settings"));
            }catch(err){
                // console.log(err)
                console.log(`Your db\\${f.charAt(0)}_settings.json file looks like to be corrupted.\nPlease fix it before it becomes an issue.`.error)
            }
        })
    }

    bot.loadConfig = (bot) => {
        const path = join(process.cwd(),"..","config.json");
        delete require.cache[path];
        try{
            bot.config = require(path);
        }catch(err){
            console.log("YOUR CONFIG.JSON FILE LOOKS LIKE TO BE CORRUPTED!\nPLEASE FIX IT BEFORE IT BECOMES AN ISSUE.".fatal)
        }
    }
}
