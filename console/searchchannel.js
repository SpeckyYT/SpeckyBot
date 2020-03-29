module.exports = {
    name: 'searchchannel',
    aliases: ['searchuser','searchmember','sc','su','sm']
}

module.exports.run = async (bot, data) => {
    if(!data.args[0]){
        if(bot.cache.console.channel){
            return console.log(String(bot.cache.console.channel).success)
        }else{
            return bot.cmdError('No channel/user found')
        }
    }
    if(bot.channels.has(data.args[0])){
        bot.cache.console.channel = bot.channels.get(data.args[0])
    }else if(bot.users.has(data.args[0])){
        bot.cache.console.channel = bot.users.get(data.args[0])
    }else{
        return bot.cmdError('No channel/user found')
    }
    console.log(`Channel/member changed to ${bot.cache.console.channel}`.info)
}
