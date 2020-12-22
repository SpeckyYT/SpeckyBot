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

    const [current, ...next] = queue.songs;

    const string1 = `Now Playing: ${current.author} - ${current.name}\n\n`.code('css');
    const string2 = `${next.slice(0,10).map((song,i) => `#${i+1} | ${song.author} - ${song.name}`).join('\n')}`.code('md');

    return msg.channel.send(
        bot.embed()
        .setTitle("Queue")
        .setDescription(`${string1}\n${next && next.length > 0 ? string2 : ''}`)
    )
}
