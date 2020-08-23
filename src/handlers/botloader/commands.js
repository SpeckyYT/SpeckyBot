const { readdirSync, lstatSync } = require("fs");
const { join } = require('path');
const { Collection } = require('discord.js');

module.exports = (bot) => {
    bot.commands = new Collection();
    bot.aliases = new Collection();
    const getDirectories = source => readdirSync(source).map(name => join(source, name)).filter(source => lstatSync(source).isDirectory());
    const getFiles = source => readdirSync(source).map(name => join(source, name)).filter(source => !lstatSync(source).isDirectory()).map(f => f.slice(f.lastIndexOf('\\')+1));

    function loadFolders(path = []){
        const currPath = path.join('\\');
        const stringPath = currPath.slice(currPath.indexOf('\\')+1);

        const files = getFiles(`.\\${currPath}`);

        if(files.includes('.ignoreall')) return;

        if(!files.includes('.ignorefiles')){
            files.filter(d => d.match(bot.supportedFiles))
            .forEach(file => {
                try{
                    const pull = bot.require(`.\\${currPath}\\${file}`);
                    if(!pull.name) throw new Error("Name of the command not found!".toUpperCase());
                    bot.commands.set(pull.name, pull);
                    if (pull.aliases) pull.aliases.forEach(a => bot.aliases.set(a, pull.name));
                    bot.log(`${stringPath.padEnd(32,' ')}|${' '.repeat(8)}${file}`.debug);
                }catch(err){
                    bot.log(`${stringPath.padEnd(32,' ')}|${' '.repeat(8)}${file} ERROR!`.error);
                    bot.log(err.message.error);
                }
            })
        }

        if(!files.includes('.ignoredirs')){
            getDirectories(`.\\${currPath}\\`)
            .forEach(dir => {
                try{
                    loadFolders([dir]);
                }catch(err){
                    bot.log(`ERROR WHILE LOADING ${stringPath+"\\"+dir} FOLDER!`.error);
                    bot.log(String(err).error);
                }
            })
        }
    }
    loadFolders(['commands']);
};
