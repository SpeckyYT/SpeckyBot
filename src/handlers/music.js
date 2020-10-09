const { Player } = require('discord-music-player');

module.exports = async (bot) => {
    if(!(bot.config && bot.config.youtube)) return;
    bot.music = new Player(
        bot,
        bot.config.youtube,
        {
            leaveOnEmpty: true,
            leaveOnEnd: true
        }
    )
};
