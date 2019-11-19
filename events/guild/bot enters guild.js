module.exports = async (bot) => {
    let cmd = bot.commands.get('checkserver');
    cmd.run(bot)
}

module.exports.config = {
    event: "guildCreate"
}