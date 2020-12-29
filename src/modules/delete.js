const fs = require('fs');
const { join } = require('path');

module.exports.deleteFolder =
    async function deleteRecursive(folder){
        if(!fs.existsSync(folder)) return;
        const data = await fs.promises.readdir(folder);

        const files = data.filter(d => fs.lstatSync(join(folder,d)).isFile());
        const dirs = data.filter(d => fs.lstatSync(join(folder,d)).isDirectory());

        for(let f of files){
            await fs.promises.unlink(join(folder,f));
        }

        for(let d of dirs){
            await deleteRecursive(join(folder,d));
        }

        return fs.promises.rmdir(folder);
    }
