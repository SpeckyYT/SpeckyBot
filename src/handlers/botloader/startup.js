const { readdirSync } = require('fs');
const { join } = require('path');

module.exports = (bot) => {
    ['prototypes','botfunctions']
    .forEach(folder => {
        readdirSync(join(process.cwd(),folder))
        .forEach(file => {
            try{
                const path = join(process.cwd(),folder,file);
                if(typeof bot.require == "function"){
                    bot.require(path)(bot);
                }else{
                    require(path)(bot);
                }
                console.log(`${file}`.debug);
            }catch(err){
                console.log(`${file} ERROR!`.error);
                console.log(err.message.error);
            }
        })
    })
}
