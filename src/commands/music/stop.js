module.exports = {
    name: "stop",
    description: "Pauses the music!",
    category: "music",
    aliases: ["pause"]
}

module.exports.run = async (bot, msg) => {
    if(!bot.music.isPlaying(msg.guild.id)) throw new Error('Not playing')
    await bot.music.pause(msg.guild.id);
    return bot.cmdSuccess('Playback paused.');
}
