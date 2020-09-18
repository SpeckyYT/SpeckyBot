const { existsSync, mkdirSync } = require('fs')
const { join } = require('path');

module.exports = async () => {
    // SRC FOLDER
    [
        'assets'
    ]
    .forEach(dir => {
        const path = join(process.cwd(),dir);
        if (!existsSync(path)) mkdirSync(path);
    });

    // ROOT
    [
        'db'
    ]
    .forEach(dir => {
        const path = join(process.cwd(),'..',dir);
        if (!existsSync(path)) mkdirSync(path);
    });

    // PRIVATE COMMANDS/EVENTS
    [
        'events',
        'commands'
    ]
    .forEach(dir => {
        const path = join(process.cwd(),dir,"private");
        if (!existsSync(path)) mkdirSync(path);
    });
}
