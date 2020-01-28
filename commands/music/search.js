module.exports = {
    name: "search",
	description: "You can search the song you like!",
    usage: ``,
    category: `music`,
	accessableby: "Members",
    aliases: []
}

module.exports.run = async (bot, msg) => {
    let { Args } = msg;
    bot.music.searchFunction(msg, Args.join(' '))
}
