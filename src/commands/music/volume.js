module.exports = {
    name: "volume",
    description: "Changes the volume of the player!",
    usage: '<percent>',
    category: "music"
}

module.exports.run = async (bot, msg) => {
    const volume = Number(msg.cmdContent)
    if(isNaN(volume)) return bot.cmdError('Volume is not a number')
    const newVolume = volume.clamp(0,100)
    bot.music.setVolume(msg.guild.id, volume.clamp(0,100))
    return msg.channel.send(`Volume got set to ${newVolume}.`);
}
