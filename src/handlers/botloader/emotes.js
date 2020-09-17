const { readdirSync, lstatSync } = require("fs");
const { join, basename } = require('path');

module.exports = (bot) => {
    bot.emotes = {}

    const getDirectories = source => readdirSync(source).map(name => join(source, name)).filter(source => lstatSync(source).isDirectory()).map(f => basename(f));
    const getFiles = source => readdirSync(source).map(name => join(source, name)).filter(source => !lstatSync(source).isDirectory()).map(f => basename(f));

    function loadFolders(path = []){
        const currPath = join(process.cwd(),...path);
        const stringPath = path.join('\\');

        const files = getFiles(currPath);

        if(files.includes('.ignoreall')) return;

        if(!files.includes('.ignorefiles')){
            files.filter(d => d.match(bot.supportedFiles))
            .forEach(file => {
                try{
                    const emojis = bot.require(join(currPath,file));
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
            getDirectories(currPath)
            .forEach(dir => {
                try{
                    loadFolders([...path,dir]);
                }catch(err){
                    bot.log(`ERROR WHILE LOADING ${stringPath+"\\"+dir} FOLDER!`.error);
                    bot.log(String(err).error);
                }
            })
        }
    }
    loadFolders(['emotes']);
};
