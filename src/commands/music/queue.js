module.exports = {
    name: "queue",
    description: "Gives you the songs queue!",
    category: "music",
    aliases: ["q","qu","que"]
}

module.exports.run = async (bot, msg) => {
    if(!bot.music.isPlaying(msg.guild.id)) throw new Error('Not playing');
    const queue = await bot.music.getQueue(msg.guild.id);
    if(!queue) return bot.cmdError('No queue found.');
    return msg.channel.send(
        bot.embed()
        .setTitle("Queue")
        .setDescription(
            queue.songs
            .slice(0,10)
            .map((song, i) =>
                `${i ? `#${i+1}` : `Current:`} - ${song.name} | ${song.author.name} (${song.duration})`
            )
            .join('\n')
            +
            (queue.songs.length >= 10 ? "\n..." : "")
        )
    )
}
