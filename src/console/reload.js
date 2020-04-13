module.exports = {
    name: 'reload',
    aliases: ['rl','rld']
}

module.exports.run = async (bot, data) => {
    const { time } = bot.reload(data.args[0]);
    console.log(`${args[0] ? String(args[0]).bold : "everything".bold} got reloaded! (${time}ms)`.success);
}