const { Player } = require('discord-music-player');

module.exports = (bot) => {
    bot.music = new Player(
        bot,
        {
            token: bot.config.youtube,
            leaveOnEmpty: true,
            leaveOnEnd: true,
            quality: 'high'
        }
    )
};
