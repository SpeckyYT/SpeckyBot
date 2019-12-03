module.exports.run = async (bot, msg, args, config) => {
    bot.music.searchFunction(msg, args.join(' '))
}

module.exports.config = {
    name: "search",
	description: "You can search the song you like!",
    usage: ``,
    category: `music`,
	accessableby: "Members",
    aliases: []
}
