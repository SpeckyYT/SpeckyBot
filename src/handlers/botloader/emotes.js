const { readdirSync, lstatSync } = require("fs");
const { join } = require('path');

module.exports = (bot) => {
    bot.emotes = {}
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
                    const emojis = bot.require(`.\\${currPath}\\${file}`);
                    if(!emojis) return;
                    const values = Object.values(emojis);
                    Object.keys(emojis)
                    .forEach((name,index) => {
                        if(bot.emotes[name]){
                            throw new Error(`Emote ${name || 'null'} already exists`);
                        }
                        bot.emotes[name] = values[index];
                    })
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
    loadFolders(['emotes']);
};
