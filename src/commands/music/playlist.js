module.exports = {
    name: "playlist",
    description: "Queues a playlist to the music!",
    usage: "<song>",
    category: "music",
    aliases: ["pl"]
}

module.exports.run = async (bot, msg) => {
    if(!msg.cmdContent) return bot.cmdError('You have to include a playlist that you want to queue.');

    const playlist = await bot.music.playlist(msg, {
        search: msg.cmdContent,
        requestedBy: msg.author.tag,
        maxSongs: 250,
    });

    const song = playlist.videos[0];

    if(song){
        return msg.channel.send(
            bot.embed()
            .setTitle(song.name)
            .setDescription(`Author: ${song.author}\nDuration: ${song.duration}\nRequested by: ${song.requestedBy}`)
            .addField('Added PlayList',`Songs: ${playlist.videos.length}`)
            .setURL(playlist.url)
        )
    }else{
        return msg.channel.send(
            bot.embed()
            .setTitle('Added PlayList!')
            .setDescription(`Songs: ${playlist.videos.length}`)
            .setURL(playlist.url)
        )
    }

    console.log(playlist);
}
