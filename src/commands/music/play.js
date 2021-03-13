module.exports = {
    name: "play",
    description: "Plays a song by choice!",
    usage: `<song>`,
    category: "music",
    aliases: ["p"]
}

module.exports.run = async (bot, msg) => {
    if(!msg.cmdContent) return bot.cmdError('You have to include a song that you want to play.');
    const { song, error } = await (
        bot.music.isPlaying(msg.guild.id) ?
            bot.music.addToQueue(msg.guild.id, msg.cmdContent, {}, msg.author.tag) :
            bot.music.play(msg.member.voice.channel, msg.cmdContent, {}, msg.author.tag)
    );
    if(error) return bot.cmdError(JSON.stringify(error));
    if(!song) return bot.cmdError('Song not found (probably a bug?)');
    return msg.channel.send(
        bot.embed()
        .setTitle(song.name)
        .setDescription(`Author: ${song.author}\nDuration: ${song.duration}\nRequested by: ${song.requestedBy}`)
        .setURL(song.url)
        .setImage(song.thumbnail)
    )
}
