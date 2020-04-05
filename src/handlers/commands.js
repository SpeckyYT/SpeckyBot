const { readdirSync, lstatSync } = require("fs");
const { join } = require('path');

module.exports = (bot) => {
    delete require.cache;
    const getDirectories = source => readdirSync(source).map(name => join(source, name)).filter(source => lstatSync(source).isDirectory());

    getDirectories('./commands/')
    .map(d => d.slice(d.indexOf('\\')+1))
    .forEach(async dir => {
        try{
            readdirSync(`./commands/${dir}/`)
            .filter(d => d.match(/.(js|ts|coffee)$/g))
            .forEach(async file => {
                try{
                    let pull = require(`../commands/${dir}/${file}`);
                    if(!pull.name) throw {message: error = "Name of the command not found!".toUpperCase()};
                    bot.commands.set(pull.name, pull);
                    if (pull.aliases) pull.aliases.forEach(a => bot.aliases.set(a, pull.name));
                    bot.log(`${dir}     \t|\t${file}`.debug);
                }catch(err){
                    bot.log(`${dir}     \t|\t${file} ERROR!`.error);
                    bot.log(err.message.error);
                }
            })
        }catch(err){bot.log(`ERROR WHILE LOADING ${dir.toUpperCase()} FOLDER!\n${err}`)}
    })
    bot.log();
};
