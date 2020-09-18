module.exports = {
    name: "play",
    description: "Plays a song by choice!",
    usage: `<song>`,
    category: "music",
    aliases: ["p"]
}

module.exports.run = async (bot, msg) => {
    bot.music[msg.author.id.isOwner()?'playTop':'play'](msg, msg.cmdContent);
}
