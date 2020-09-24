module.exports = {
    name: "nowplaying",
    description: "Gives you the name of the song!",
    category: "music",
    aliases: ["np"]
}

module.exports.run = async (bot, msg) => {
    const song = await bot.music.nowPlaying(msg.guild.id);
    return msg.channel.send(
        bot.embed()
        .setTitle(song.name)
        .setDescription(`Author: ${song.author.name}\nDuration: ${song.duration}\nRequested by: ${song.requestedBy}`)
        .setURL(song.url)
        .setImage(song.thumbnail)
    )
}
