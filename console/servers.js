module.exports = {
    name: 'servers',
    aliases: ['guilds']
}

module.exports.run = async (bot, args) => {
    console.log(
        bot.guilds.map(s => `[${s.id}] ${s.name}`).join('\n').info
    )
}
