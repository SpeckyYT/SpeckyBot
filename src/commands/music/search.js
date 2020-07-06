module.exports = {
    name: "search",
    description: "You can search the song you like!",
    usage: ``,
    category: `music`,
    aliases: []
}

module.exports.run = async (bot, msg) => {
    const { Args } = msg;
    bot.music.searchFunction(msg, Args.join(' '))
}
