const { readdirSync } = require('fs');

module.exports = (bot) => {
    ['prototypes','botfunctions']
    .forEach(folder => {
        readdirSync(`./${folder}/`)
        .forEach(file => {
            try{
               if(bot.require){
                    bot.require(`./${folder}/${file}`)(bot);
                }else{
                    require(`../../${folder}/${file}`)(bot);
                }
                console.log(`${file}`.debug);
            }catch(err){
                console.log(`${file} ERROR!`.error);
                console.log(err.message.error);
            }
        })
    })
}
