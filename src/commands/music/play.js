module.exports = {
    name: "play",
    description: "Plays a song by choice!",
    usage: `<song>`,
    category: `music`,
    aliases: ["p"]
}

module.exports.run = async (bot, msg) => {
    const { Args } = msg;
    bot.music.playFunction(msg, Args.join(' '))
}
