module.exports = {
    name: "playlist",
    description: "Queues a playlist to the music!",
    usage: "<song>",
    category: "music",
    aliases: ["pl"]
}

module.exports.run = async (bot, msg) => {
    if(!msg.cmdContent) return bot.cmdError('You have to include a playlist that you want to queue.');

    const { playlist, song } = await bot.music.playlist(msg.guild.id, msg.cmdContent, msg.member.voice.channel, 100, msg.author.tag);

    if(song){
        return msg.channel.send(
            bot.embed()
            .setTitle(song.name)
            .setDescription(`Author: ${song.author}\nDuration: ${song.duration}\nRequested by: ${song.requestedBy}`)
            .addField('Added PlayList',`Songs: ${playlist.playlistSongs.length}`)
            .setURL(playlist.link)
        )
    }else{
        return msg.channel.send(
            bot.embed()
            .setTitle('Added PlayList!')
            .setDescription(`Songs: ${playlist.playlistSongs.length}`)
            .setURL(playlist.link)
        )
    }

    console.log(playlist);
}
