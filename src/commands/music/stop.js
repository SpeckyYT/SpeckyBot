module.exports = {
    name: "stop",
    description: "Pauses the music!",
    category: "music",
    aliases: ["pause"]
}

module.exports.run = async (bot, msg) => {
    await bot.music.pause(msg.guild.id);
    return msg.channel.send('Playback paused.')
}
