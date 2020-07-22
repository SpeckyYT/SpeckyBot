module.exports = async (bot) => {
    const musicClient = require('la-music-core');
    bot.music = new musicClient(bot.config.youtube);
};
