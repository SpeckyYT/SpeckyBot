module.exports = (bot) => {
    bot.require = (module) => {
        try{
            delete require.cache[require.resolve(module)];
        }catch(e){}
        return require(module);
    }
}
