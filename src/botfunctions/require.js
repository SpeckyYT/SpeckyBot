const { join } = require('path');

module.exports = (bot) => {
    bot.require = (path) => {
        const mod = join(process.cwd(),path);
        try{
            delete require.cache[mod];
        }catch(e){}
        return require(mod);
    }
}
