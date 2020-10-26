module.exports = {
    name: "leave",
    description: "Leaves the vocal channel!",
    category: "music"
}

module.exports.run = async (bot, msg) => {
    if(!bot.music.isPlaying(msg.guild.id)) {
        await msg.guild.me.voice.channel.leave();
    }else{
        await bot.music.stop(msg.guild.id);
    }
    return bot.cmdSuccess('Left the vocal channel');
}
