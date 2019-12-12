const { existsSync, mkdirSync } = require('fs')

module.exports = async () => {
    let eventsprivate = './events/private'
    let cmdsprivate = './commands/private'

    if (!existsSync(eventsprivate)) {
        mkdirSync(eventsprivate)
    }
    if (!existsSync(cmdsprivate)) {
        mkdirSync(cmdsprivate)
    }
}
