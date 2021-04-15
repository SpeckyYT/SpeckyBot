const { join, isAbsolute } = require('path');

module.exports = (bot) => {
    bot.require = (path) => {
        const mod = isAbsolute(path) ? path : join(process.cwd(),path);
        delete require.cache[mod];
        return require(mod);
    }
}
