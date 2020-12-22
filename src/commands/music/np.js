module.exports = {
    name: "nowplaying",
    description: "Gives you the name of the song!",
    category: "music",
    aliases: ["np"]
}

module.exports.run = async (bot, msg) => {
    if(!bot.music.isPlaying(msg.guild.id)) throw new Error('Not playing')
    const song = await bot.music.nowPlaying(msg.guild.id);
    return msg.channel.send(
        bot.embed()
        .setTitle(song.name)
        .setDescription(`Author: ${song.author}\nDuration: ${song.duration}\n\`${bot.music.createProgressBar(msg.guild.id,20,'>','=')}\`\nRequested by: ${song.requestedBy}`)
        .setURL(song.url)
        .setImage(song.thumbnail)
    )
}
