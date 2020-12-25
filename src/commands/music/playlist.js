module.exports = {
    name: "playlist",
    description: "Queues a playlist to the music!",
    usage: "<song>",
    category: "music",
    aliases: ["pl"]
}

module.exports.run = async (bot, msg) => {
    if(!msg.cmdContent) return bot.cmdError('You have to include a playlist that you want to queue.');

    if(!bot.music.isPlaying(msg.guild.id)){
        const perms = ['CONNECT','SPEAK'].map(perm => msg.member.voice.channel.permissionsFor(bot.user.id).has(perm));
        if(perms.some(v => !v)){
            return bot.cmdError(`Missing permission${perms.filter(v => !v).length == 1 ? '' : 's'}: ${['CONNECT','SPEAK'].filter((v,i) => !perms[i]).join(' ')}`)
        }
    }

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
