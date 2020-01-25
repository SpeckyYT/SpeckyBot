module.exports = {
    name: 'searchchannel',
    aliases: ['searchuser','searchmember','sc','su','sm']
}

module.exports.run = async (bot, args) => {
    if(!args[0]){
        if(bot.cache.console.channel){
            return bot.cmdError(bot.cache.console.channel)
        }else{
            return bot.cmdError('No channel/user found')
        }
    }
    if(bot.channels.has(args[0])){
        bot.cache.console.channel = bot.channels.get(args[0])
    }else if(bot.users.has(args[0])){
        bot.cache.console.channel = bot.users.get(args[0])
    }else{
        return bot.cmdError('No channel/user found')
    }
}
