module.exports = {
    name: "volume",
    description: "Changes the volume of the player!",
    usage: '<percent>',
    category: "music"
}

module.exports.run = async (bot, msg) => {
    if(!bot.music.isPlaying(msg.guild.id)) throw new Error('Not playing')
    const volume = Number(msg.cmdContent);
    if(isNaN(volume) || !msg.cmdContent) return bot.cmdError('Volume is not a number');
    const newVolume = volume.clamp(0,250);
    bot.music.setVolume(msg.guild.id, newVolume);
    return bot.cmdSuccess(`Volume got set to ${newVolume}%`);
}
