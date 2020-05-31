module.exports = {
    name: "pause",
    description: "Pauses the playing song!",
    usage: ``,
    category: `music`,
    accessableby: "Members",
    aliases: ["stop","paus"]
}

module.exports.run = async (bot, msg) => {
    const { args } = msg;
    bot.music.pauseFunction(msg, args.join(' '))
}
