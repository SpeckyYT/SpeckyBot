module.exports = {
    name: "loop",
    description: "Loops the song!",
    category: "music",
    usage: "<yes|no>",
    aliases: ["l"]
}

module.exports.run = async (bot, msg) => {
    if(!bot.music.isPlaying(msg)) throw new Error('Not playing');
    if(!msg.args[0]) return bot.cmdError('You have to include a `yes` or `no`');
    switch(msg.args[0]){
        case 'yes':
        case 'true':
        case 'on':
            bot.music.setRepeatMode(msg, true);
            return bot.cmdSuccess("Loop got set to `true`")
            break;
        case 'no':
        case 'false':
        case 'off':
            bot.music.setRepeatMode(msg, false);
            return bot.cmdSuccess("Loop got set to `false`")
            break;
        default:
            return bot.cmdError('You have to include a `yes` or `no`')
    }
}
