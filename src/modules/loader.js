const { readdirSync, lstatSync } = require("fs");
const { join, basename, sep } = require('path');

const getDirectories = source => readdirSync(source).map(name => join(source, name)).filter(source => lstatSync(source).isDirectory()).map(f => basename(f));
const getFiles = source => readdirSync(source).map(name => join(source, name)).filter(source => !lstatSync(source).isDirectory()).map(f => basename(f));

module.exports.loader = (bot,path,cb) => {
    function loadFolders(path = []){
        const currPath = join(process.cwd(),...path);
        const stringPath = path.slice(1).join(sep) || path[0];

        const files = getFiles(currPath);

        if(files.some(f => f.startsWith('.ignoreall'))) return;

        if(!files.some(f => f.startsWith('.ignorefiles'))){
            files.filter(d => d.match(bot.supportedFiles))
            .forEach(file => {
                const pathLog = stringPath.padEnd(36,' ');
                const spacingLog1 = ' '.repeat(8);
                const fileLog = file.padEnd(24,' ');
                const spacingLog2 = ' '.repeat(2);
                const stick = "|";
                const timeLog = () => `${new Date().getTime() - start}ms`;
                const start = new Date().getTime();
                try{
                    const filePath = join(currPath,file);
                    cb({filePath});
                    (bot.log||console.log)(`${pathLog.debug}${stick.green}${spacingLog1}${fileLog.debug}${stick.green}${spacingLog2}${timeLog().yellow}`);
                }catch(err){
                    (bot.log||console.log)(`${pathLog}${stick}${spacingLog1}${fileLog}${stick}${spacingLog2}ERROR!`.fatal);
                    (bot.log||console.log)(`${(err||{}).message || err}`.error);
                }
            })
        }

        if(!files.some(f => f.startsWith('.ignoredirs'))){
            getDirectories(currPath)
            .forEach(dir => {
                try{
                    return loadFolders([...path,dir]);
                }catch(err){
                    (bot.log||console.log)(`ERROR WHILE LOADING ${stringPath+sep+dir} FOLDER!`.error);
                    (bot.log||console.log)(String(err).error);
                }
            })
        }
    }
    return loadFolders([path]);
}
