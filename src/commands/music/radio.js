module.exports = {
    name: "radio",
    description: "Puts a playlist into the queue!",
    category: "music",
}

const radios = [
    {
        name: 'Muse',
        url: "https://youtube.com/playlist?list=PLTpHAWOyakLaaSnO1SyJor4r0y_ZmYwHg",
        from: 'Ranger',
    },
    {
        name: 'Black Wolf',
        url: "https://youtube.com/playlist?list=PLNiLQueObdrT1TeviIQ7xJNqElO-55WRT",
        from: 'Black Wolf'
    },
    {
        name: 'NCS',
        url: "https://youtube.com/playlist?list=PLzkuLC6Yvumv_Rd5apfPRWEcjf9b1JRnq",
        from: 'Specky'
    },
];

const { compareTwoStrings } = require('string-similarity');

module.exports.run = async (bot, msg) => {
    if(!bot.music.isPlaying(msg.guild.id)){
        const perms = ['CONNECT','SPEAK'].map(perm => msg.member.voice.channel.permissionsFor(bot.user.id).has(perm));
        if(perms.some(v => !v)){
            return bot.cmdError(`Missing permission${perms.filter(v => !v).length == 1 ? '' : 's'}: ${['CONNECT','SPEAK'].filter((v,i) => !perms[i]).join(' ')}`)
        }
    }

    const playlist =
        msg.cmdContent ?
            radios.map(r => ({
                value: compareTwoStrings(
                    msg.cmdContent.toLowerCase(),
                    r.name.toLowerCase(),
                ),
                radio: r,
            }))
            .sort((a,b) => b.value-a.value)[0].radio :
            radios.pick();

    if(bot.music.isPlaying(msg.guild.id)) bot.music.stop(msg.guild.id);
    await bot.music.playlist(msg.guild.id, playlist.url, msg.member.voice.channel, 500, msg.author.tag);
    bot.music.toggleQueueLoop(msg.guild.id);
    bot.music.shuffle(msg.guild.id);
    // bot.music.skip(msg.guild.id);
    return msg.channel.send(
        bot.embed()
        .setTitle(`Now Playing "${playlist.name}"`)
        .setDescription(`Available radio stations:\n${
            radios.map(radio => `+ ${radio.name}`).join('\n').code('diff')
        }`)
        .setURL(playlist.url)
        .setFooter(`From: ${playlist.from}`)
    )
}
