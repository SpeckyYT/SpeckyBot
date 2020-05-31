const { readdirSync, lstatSync } = require("fs");
const { join } = require('path');
const { Collection } = require('discord.js');

module.exports = (bot) => {
    bot.commands = new Collection();
    bot.aliases = new Collection();
    const getDirectories = source => readdirSync(source).map(name => join(source, name)).filter(source => lstatSync(source).isDirectory());
    getDirectories('./commands/')
    .forEach(async cdir => {
        try{
            readdirSync(`./${cdir}/`)
            .filter(d => d.match(bot.supportedFiles))
            .forEach(async file => {
                const dir = cdir.slice(1+Math.max(cdir.indexOf('/'),cdir.indexOf('\\')));
                try{
                    const pull = bot.require(`./${cdir}/${file}`);
                    if(!pull.name) throw {
                        message: {
                            error: "Name of the command not found!".toUpperCase()
                        }
                    };
                    bot.commands.set(pull.name, pull);
                    if (pull.aliases) pull.aliases.forEach(a => bot.aliases.set(a, pull.name));
                    bot.log(`${dir}     \t|\t${file}`.debug);
                }catch(err){
                    bot.log(`${dir}     \t|\t${file} ERROR!`.error);
                    console.error(err);
                }
            })
        }catch(err){
            bot.log(`ERROR WHILE LOADING ${cdir.toUpperCase()} FOLDER!`);
            bot.log(String(err));
        }
    })
    bot.log();
};
