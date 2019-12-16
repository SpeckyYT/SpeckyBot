const { existsSync, mkdirSync } = require('fs')

module.exports = async () => {
    [
    './events/private',
    './commands/private'
    ]
    .forEach(dir => {
        if (!existsSync(dir)) mkdirSync(dir);
    })
}
