module.exports = {
    name: 'leavevc',
    aliases: ['lvc']
}

module.exports.run = async (bot, data) => {
    if(!data.args[0]){
        return bot.cache.console.channel.leave()
    }else{
        return bot.channels.cache.get(data.args[0]).leave()
    }
}
