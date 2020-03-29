module.exports = {
    name: "pause",
	description: "Pauses the playing song!",
    usage: ``,
    category: `music`,
	accessableby: "Members",
    aliases: ["stop","paus"]
}

module.exports.run = async (bot, msg) => {
    let { args } = msg;
    bot.music.pauseFunction(msg, args.join(' '))
}
