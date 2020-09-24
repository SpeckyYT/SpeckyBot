module.exports = {
    name: "queue",
    description: "Gives you the songs queue!",
    category: "music",
    aliases: ["q","qu","que"]
}

module.exports.run = async (bot, msg) => {
    const queue = await bot.music.getQueue(msg.guild.id);
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
