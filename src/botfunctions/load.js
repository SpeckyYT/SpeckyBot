const {  readFile } = require('fs');
const { join } = require('path');

module.exports = (bot) => {
    bot.loadConfig = async () => {
        const path = join(process.cwd(),"..","config.json");
        return new Promise((res,rej) => {
            readFile(path,{encoding:'utf-8'},(err,data) => {
                if(err) rej(err);
                try{
                    Object.defineProperty(bot, 'config', {
                        enumerable: false,
                        writable: false,
                        value: JSON.parse(data),
                    });
                    res();
                }catch(e){
                    rej(e);
                }
            });
        });
    }
}
