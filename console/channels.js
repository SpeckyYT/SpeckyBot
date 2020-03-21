module.exports = {
    name: 'channels',
    aliases: []
}

module.exports.run = async (bot, args) => {
    if(!args[0]){
        console.log(
            bot.guilds.map(s => `${s.channels.sort().map(c => `{${s.id}}\t${s.name}\t[${c.id}]\t${c.name}\t(${c.type})`).join('\n')}`).join('\n').info
        )
    }else{
        let guild = bot.guilds.get(args[0]);
        
        if(guild){
            console.log(
                guild.channels.sort().map(c => `{${c.guild.id}}\t${c.guild.name}\t[${c.id}]\t(${c.type.toUpperCase()})\t${c.name}`).join('\n').info
            )
        }else{
            console.log("Guild not found".error)
        }
    }
}
