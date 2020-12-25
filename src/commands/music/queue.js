module.exports = {
    name: "queue",
    description: "Gives you the songs queue!",
    category: "music",
    aliases: ["q","qu","que"]
}

const queueLength = 10;

module.exports.run = async (bot, msg) => {
    if(!bot.music.isPlaying(msg.guild.id)) throw new Error('Not playing');
    const queue = await bot.music.getQueue(msg.guild.id);
    if(!queue) return bot.cmdError('No queue found.');

    const [current, ...next] = queue.songs;

    /** Now Playing */
    const string1 = `Now Playing: ${current.author} - ${current.name}\n\n`.code('css');
    /** Queue */
    const string2 = next.length && next.slice(0,queueLength).map((song,i) => `#${i+1} | ${song.author} - ${song.name}`).join('\n').code('md');
    /** Longer than queue... */
    const string3 = next.length > queueLength && `and other ${next.length-queueLength} songs...`.code();

    return msg.channel.send(
        bot.embed()
        .setTitle("Queue")
        .setDescription([string1,string2,string3].filter(s=>s).join('\n'))
    )
}
