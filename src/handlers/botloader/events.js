const { readdirSync, lstatSync } = require("fs");
const { join } = require('path');
const promisify = require('promisify-func');

module.exports = async (bot) => {
    bot.removeAllListeners();
    const getDirectories = source => readdirSync(source).map(name => join(source, name)).filter(source => lstatSync(source).isDirectory());
    const getFiles = source => readdirSync(source).map(name => join(source, name)).filter(source => !lstatSync(source).isDirectory()).map(f => f.slice(f.lastIndexOf('\\')+1));

    function loadFolders(path = []){
        const currPath = path.join('\\');
        const stringPath = currPath.slice(currPath.indexOf('\\')+1);

        const files = getFiles(`.\\${currPath}\\`);

        if(files.includes('.ignoreall')) return;

        if(!files.includes('.ignorefiles')){
            files.filter(d => d.match(bot.supportedFiles))
            .forEach(file => {
                try{
                    const evt = bot.require(`.\\${currPath}\\${file}`);
                    let eName = evt.event;
                    if(!eName) throw new Error("Event not found!".toUpperCase());
                    const calltype = evt.type == "once" ? "once" : "on";
                    if(!Array.isArray(eName)) eName = [eName];
                    eName.forEach(event => bot[calltype](event, promisify(bot.getFunction(evt).bind(null, bot))))
                    bot.log(`${stringPath.padEnd(32,' ')}|${' '.repeat(8)}${file}`.debug);
                }catch(err){
                    bot.log(`${stringPath.padEnd(32,' ')}|${' '.repeat(8)}${file} ERROR!`.error);
                    bot.log(err.message.error);
                }
            })
        }

        if(!files.includes('.ignoredirs')){
            getDirectories(`.\\${currPath}`)
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
    loadFolders(['events']);
};
