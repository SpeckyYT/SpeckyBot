module.exports = {
    name: 'servers',
    aliases: ['guilds']
}

module.exports.run = async (bot, data) => {
    console.table(bot.guilds.map(g=>[g.id,g.name]))
}
