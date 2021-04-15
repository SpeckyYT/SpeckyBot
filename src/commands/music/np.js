module.exports = {
    name: "nowplaying",
    description: "Gives you the name of the song!",
    category: "music",
    aliases: ["np"]
}

module.exports.run = async (bot, msg) => {
    if(!bot.music.isPlaying(msg)) throw new Error('Not playing');
    const song = await bot.music.nowPlaying(msg);
    return msg.channel.send(
        bot.embed()
        .setTitle(song.name)
        .setDescription(
            [
                `Author: ${song.author}`,
                `Duration: ${song.duration}`,
                bot.music.createProgressBar(
                    msg,
                    {
                        size: 20,
                        arrow: '>',
                        block: '=',
                    }
                ).code(),
                `Requested by: ${song.requestedBy}`,
            ]
        )
        .setURL(song.url)
        .setImage(song.thumbnail)
    )
}
