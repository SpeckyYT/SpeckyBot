module.exports = {
    name: 'debug',
    aliases: ['deb']
}

module.exports.run = async (bot, args) => {
    if(!args[0]){
        bot.cache.console.debug = !bot.cache.console.debug
    }else{
        switch(args[0]){
            case 'true':
            case 'on':
                bot.cache.console.debug = true;
                break;
            
            case 'false':
            case 'off':
                bot.cache.console.debug = false;
                break;

            default:
                bot.cache.console.debug = !bot.cache.console.debug
        }
    }

    if(bot.cache.console.debug){
        console.log("Debug turned ON".warn)
    }else{
        console.log("Debug turned OFF".warn)
    }
}
