module.exports = {
    name: "skip",
    description: "Skips the playing song!",
    category: "music",
    aliases: ["s"]
}

module.exports.run = async (bot, msg) => {
    const song = await bot.music.skip(msg.guild.id);
    return msg.channel.send(`${song.name} got skipped!`)
}
