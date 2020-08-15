const fs = require('fs')

module.exports = () => {
    ['.txt'].forEach(ext => {
        require.extensions[ext] = (module, filename) => {
            module.exports = fs.readFileSync(filename,{encoding: 'utf8'});
        }
    })
}
