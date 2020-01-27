module.exports = {
    name: 'sendmessage',
    aliases: ['say','send','s','>','<']
}

module.exports.run = async (bot, args) => {
    if(bot.cache.console.channel){
        await bot.cache.console.channel.send(args.join(' '))
        .catch(() => {
            return bot.cmdError('Error happend while sending the message')
        })
    }else{
        return bot.cmdError('No channel found')
    }
}
