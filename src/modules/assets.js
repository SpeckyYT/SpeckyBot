const fetch = require('node-fetch');
const { join } = require('path');
const fs = require('fs');

global.assets = {}

module.exports = {
    save: (fileURL,filename) => {
        if(Array.isArray(fileURL)){
            [fileURL, filename] = fileURL;
        }
        const pathToFile = join(process.cwd(),'assets',filename);
        if(!fs.existsSync(pathToFile)){
            return fetch(fileURL)
            .then(d => d.buffer())
            .then(b => global.assets[filename.slice(0,filename.lastIndexOf('.'))] = b)
            .then(l => fs.writeFileSync(pathToFile));
        }else{
            return new Promise((res,rej) => {
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
            })
        }
    }
}
