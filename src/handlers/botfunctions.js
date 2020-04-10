const { readdirSync } = require('fs');

module.exports = (bot) => {
    readdirSync('./botfunctions/')
    .forEach(file => {
        try{
            if(bot.require){
                bot.require(`../botfunctions/${file}`)(bot);
            }else{
                require(`../botfunctions/${file}`)(bot);
            }
            console.log(`${file}`.debug);
        }catch(err){
            console.log(`${file} ERROR!`.error);
            console.log(err.message.error);
        }
    })
}
