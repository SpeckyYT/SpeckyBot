module.exports = {
    name: "resume",
    description: "Resumes the paused song!",
    category: "music",
    aliases: ["resum"]
}

module.exports.run = async (bot, msg) => {
    if(!bot.music.isPlaying(msg)) throw new Error('Not playing');
    await bot.music.resume(msg);
    return bot.cmdSuccess('Playback resumed.');
}
