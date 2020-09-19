const {  readFile } = require('fs');
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

    bot.loadConfig = async () => {
        const path = join(process.cwd(),"..","config.json");
        return new Promise((res,rej) => {
            readFile(path,{encoding:'utf-8'},(err,data) => {
                if(err) rej(err);
                try{
                    bot.config = JSON.parse(data);
                    res();
                }catch(e){
                    rej(e);
                }
            });
        });
    }
}
