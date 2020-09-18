const musicClient = require('la-music-core');

module.exports = async (bot) => {
    if(!(bot.config && bot.config.youtube)) return;
    bot.music = new musicClient(bot.config.youtube);
};
