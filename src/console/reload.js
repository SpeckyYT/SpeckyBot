module.exports = {
    name: 'reload',
    aliases: ['rl','rld']
}

module.exports.run = async (bot, data) => {
    const { time } = bot.reload();
    console.log(`${"everything".bold} got reloaded! (${time}ms)`.success);
}