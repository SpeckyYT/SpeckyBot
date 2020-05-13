let alreadyLoaded = [];

module.exports = (bot) => {
    ["botfunctions","prototypes","console","events","commands","music"].forEach(async x => {
        if(x == 'music'){
            if(alreadyLoaded.includes(x)){
                return;
            }else{
                alreadyLoaded.push(x)
            }
        }
        
        if(bot.log){
            bot.log(`\n\nLoading ${x.toUpperCase()}!\n`.info);
        }else{
            console.log(`\n\nLoading ${x.toUpperCase()}!\n`.info);
        }
        require(`./${x}`)(bot);
    });
}
