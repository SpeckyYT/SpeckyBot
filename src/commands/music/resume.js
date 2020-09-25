module.exports = {
    name: "resume",
    description: "Resumes the paused song!",
    category: "music",
    aliases: ["resum"]
}

module.exports.run = async (bot, msg) => {
    if(!bot.music.isPlaying(msg.guild.id)) throw new Error('Not playing')
    await bot.music.resume(msg.guild.id);
    return bot.cmdSuccess('Playback resumed.');
}
