module.exports = {
    name: "loop",
    description: "Loops the song!",
    category: "music",
    usage: "<yes|no>",
    aliases: ["l"]
}

module.exports.run = async (bot, msg) => {
    if(!msg.args[0]) return bot.cmdError('You have to include a `yes` or `no`');
    switch(msg.args[0]){
        case 'yes':
        case 'true':
        case 'on':
            return bot.music.setRepeatMode(msg.guild.id, true);
            break;
        case 'no':
        case 'false':
        case 'off':
            return bot.music.setRepeatMode(msg.guild.id, false);
            break;
        default:
            return bot.cmdError('You have to include a `yes` or `no`')
    }
}
