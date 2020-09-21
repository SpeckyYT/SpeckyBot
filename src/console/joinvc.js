module.exports = {
    name: 'joinvc',
    aliases: ['jvc']
}

module.exports.run = async (bot, data) => {
    if(!data.args[0]){
        return bot.cache.console.channel.join()
    }else{
        return bot.channels.cache.get(data.args[0]).join()
    }
}
