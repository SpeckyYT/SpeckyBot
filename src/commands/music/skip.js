module.exports = {
    name: "skip",
    description: "Skips the playing song!",
    category: "music",
    aliases: ["s"]
}

module.exports.run = async (bot, msg) => {
    if(!bot.music.isPlaying(msg)) throw new Error('Not playing')
    const song = await bot.music.skip(msg);
    return bot.cmdSuccess(`${song.name} got skipped!`);
}
