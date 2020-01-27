module.exports = {
    name: 'leavevc',
    aliases: ['lvc']
}

module.exports.run = async (bot, args) => {
    if(!args[0]){
        return bot.cache.console.channel.leave()
    }else{
        return bot.channels.get(args[0]).leave()
    }
}
