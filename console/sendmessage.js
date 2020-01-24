module.exports.run = (bot, args) => {
    try{
        let guild = bot.guilds.get(bot.cache.console.guild)

        let channel = guild.channels.get(bot.cache.console.channel)

        channel.send(args.join(' '))
    }catch(err){
        console.log(err.error)
    }
}

module.exports = {
    name: 'searchserver',
    aliases: ['ss']
}