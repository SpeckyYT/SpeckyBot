module.exports = {
    name: "play",
    description: "Plays a song by choice!",
    usage: `<song>`,
    category: "music",
    aliases: ["p"]
}

module.exports.run = async (bot, msg) => {
    const { song } = await (bot.music.isPlaying(msg.guild.id) ?
        bot.music.addToQueue(msg.guild.id, msg.cmdContent, msg.author.tag) :
        bot.music.play(msg.member.voice.channel, msg.cmdContent));
    return msg.channel.send(
        bot.embed()
        .setTitle(song.name)
        .setDescription(`Author: ${song.author.name}\nDuration: ${song.duration}\nRequested by: ${song.requestedBy}`)
        .setURL(song.url)
        .setImage(song.thumbnail)
    )
}
