module.exports = {
    name: "stop",
    description: "Stops the music!",
    category: "music",
    aliases: []
}

module.exports.run = async (bot, msg) => {
    if(!bot.music.isPlaying(msg)) throw new Error('Not playing');
    await bot.music.stop(msg);
    return bot.cmdSuccess('Playback stopped.');
}
