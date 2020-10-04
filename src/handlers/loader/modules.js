const { readdirSync, lstatSync } = require("fs");
const { join, basename } = require('path');

module.exports = (bot) => {
    bot.modules = {}
    global.modules = bot.modules;

    const getDirectories = source => readdirSync(source).map(name => join(source, name)).filter(source => lstatSync(source).isDirectory()).map(f => basename(f));
    const getFiles = source => readdirSync(source).map(name => join(source, name)).filter(source => !lstatSync(source).isDirectory()).map(f => basename(f));

    function loadFolders(path = []){
        const currPath = join(process.cwd(),...path);
        const stringPath = path.slice(1).join('\\') || path[0];

        const files = getFiles(currPath);

        if(files.includes('.ignoreall')) return;

        if(!files.includes('.ignorefiles')){
            files.filter(d => d.match(bot.supportedFiles))
            .forEach(file => {
                try{
                    const modules = bot.require(join(currPath,file));
                    if(!modules) return;
                    const values = Object.values(modules);
                    Object.keys(modules)
                    .forEach((name,index) => {
                        if(bot.modules[name]){
                            throw new Error(`Module ${name || 'null'} already exists`);
                        }
                        bot.modules[name] = values[index];
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
    loadFolders(['modules']);
};
