const { readdirSync } = require('fs');
const { join } = require('path');

module.exports = (bot) => {
    readdirSync(join(process.cwd(),'prototypes'))
    .forEach(file => {
        try{
            const path = join(process.cwd(),'prototypes',file);
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
