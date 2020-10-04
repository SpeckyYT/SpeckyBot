const fetch = require('node-fetch');
const { join } = require('path');
const fs = require('fs');

module.exports.saveAsset = (fileURL,filename) => {
    if(!global.assets){
        global.assets = {}
    }

    if(Array.isArray(fileURL)){
        [fileURL, filename] = fileURL;
    }

    const assetsFolder = join(process.cwd(),'assets');
    const pathToFile = join(assetsFolder,filename);

    if(!fs.existsSync(assetsFolder)){
        fs.mkdirSync(assetsFolder);
    }

    return new Promise((res,rej) => {
        if(!fs.existsSync(pathToFile)){
            fetch(fileURL)
            .then(d => d.buffer())
            .then(b => global.assets[filename.slice(0,filename.lastIndexOf('.'))] = b)
            .then(l => fs.writeFile(pathToFile, l, {encoding:'base64'}, (e) => e ? rej(e) : res(l)))
        }else{
            fs.readFile(
                pathToFile,
                {encoding: 'base64'},
                (err, data) => {
                    if(err) rej(err);
                    const d = Buffer.from(data,'base64');
                    global.assets[filename.slice(0,filename.lastIndexOf('.'))] = d;
                    res(d);
                }
            )
        }
    })
}
