const { readdirSync } = require('fs');
const { join } = require('path');

module.exports = (bot) => {
    readdirSync(join(process.cwd(),'botfunctions'))
    .forEach(file => {
        try{
            const path = join(process.cwd(),'botfunctions',file);
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
}
