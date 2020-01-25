module.exports = {
    name: 'help',
    aliases: ['halp','h','hwlp','hwelp']
}

module.exports.run = async (bot, args) => {
    if(!args[0]){
        console.log(bot.console.map(c => c.name).join(" ").data)
    }
}
