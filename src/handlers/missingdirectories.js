const { existsSync, mkdirSync } = require('fs')
const { join } = require('path');

module.exports = async () => {
    [
        'events',
        'commands'
    ]
    .forEach(dir => {
        const path = join(process.cwd(),dir,"private");
        if (!existsSync(path)) mkdirSync(path);
    });
    [
        'db'
    ]
    .forEach(dir => {
        const path = join(process.cwd(),'..',dir);
        if (!existsSync(path)) mkdirSync(path);
    });
}
