const { Player } = require('discord-music-player');

module.exports = (bot) => {
    bot.music = new Player(
        bot,
        {
            leaveOnEmpty: true,
            leaveOnEnd: true,
            timeout: 15000,
            quality: 'high'
        }
    )
};
