const { join, isAbsolute } = require('path');

module.exports = (bot) => {
    bot.require = (path) => {
        let mod;
        if(isAbsolute(path)){
            mod = path;
        }else{
            mod = join(process.cwd(),path);
        }
        try{
            delete require.cache[mod];
        }catch(e){}
        return require(mod);
    }
}
