const musicClient = require('la-music-core');

module.exports = async (bot) => {
    bot.music = new musicClient(bot.config.youtube);
};
