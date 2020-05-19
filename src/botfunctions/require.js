const { join } = require('path');

module.exports = (bot) => {
    bot.require = (module) => {
        const mod = join(process.cwd(),module);
        try{
            delete require.cache[mod];
        }catch(e){}
        return require(mod);
    }
}
