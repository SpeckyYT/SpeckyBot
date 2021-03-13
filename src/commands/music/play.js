module.exports = {
    name: "play",
    description: "Plays a song by choice!",
    usage: `<song>`,
    category: "music",
    aliases: ["p"]
}

module.exports.run = async (bot, msg) => {
    if(!msg.cmdContent) return bot.cmdError('You have to include a song that you want to play.');
    const search = {
        search: msg.cmdContent,
        requestedBy: msg.author.tag,
    }
    const song = await (
        bot.music.isPlaying(msg) ?
            bot.music.addToQueue(msg,search) :
            bot.music.play(msg, search)
    );
    return msg.channel.send(
        bot.embed()
        .setTitle(song.name)
        .setDescription(`Author: ${song.author}\nDuration: ${song.duration}\nRequested by: ${song.requestedBy}`)
        .setURL(song.url)
        .setImage(song.thumbnail)
    )
}
