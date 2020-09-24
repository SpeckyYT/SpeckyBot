module.exports = {
    name: "resume",
    description: "Resumes the paused song!",
    category: "music",
    aliases: ["resum"]
}

module.exports.run = async (bot, msg) => {
    await bot.music.resume(msg.guild.id);
    return msg.channel.send('Playback resumed.')
}
