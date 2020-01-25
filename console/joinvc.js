module.exports = {
    name: 'joinvc',
    aliases: ['jvc']
}

module.exports.run = async (bot, args) => {
    if(!args[0]){
        return bot.cache.console.channel.join()
    }else{
        return bot.channels.get(args[0]).join()
    }
}
