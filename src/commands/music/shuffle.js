module.exports = {
    name: "shuffle",
    description: "Shuffles the queue!",
    category: "music",
}

module.exports.run = async (bot, msg) => {
    if(!bot.music.isPlaying(msg)) throw new Error('Not playing');
    bot.music.shuffle(msg);
    return bot.cmdSuccess(`Successfully shuffled the queue!`);
}
