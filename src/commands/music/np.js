module.exports = {
    name: "nowplaying",
	description: "Gives you the name of the song!",
    usage: ``,
    category: `music`,
	accessableby: "Members",
    aliases: ["np"]
}

module.exports.run = async (bot, msg) => {
    let { args } = msg;
    bot.music.npFunction(msg, args.join(' '))
}
