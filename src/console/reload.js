module.exports = {
    name: 'reload',
    aliases: ['rl','rld']
}

module.exports.run = async (bot, data) => {
    const { time } = bot.reload(data.args[0]);
    console.log(`${String(args[0]).bold} got reloaded! (${time}ms)`.success);
}