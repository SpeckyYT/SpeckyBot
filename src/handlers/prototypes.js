const { readdirSync } = require('fs');

module.exports = (bot) => {
    readdirSync('./prototypes/')
    .forEach(file => {
        try{
            if(bot.require){
                bot.require(`../prototypes/${file}`)();
            }else{
                require(`../prototypes/${file}`)();
            }
            console.log(`${file}`.debug);
        }catch(err){
            console.log(`${file} ERROR!`.error);
            console.log(err.message.error);
        }
    })
}
