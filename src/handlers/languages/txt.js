const fs = require('fs')

module.exports = () => {
    require.extensions['.txt'] = (module, filename) => {
        module.exports = fs.readFileSync(filename,{encoding: 'utf8'});
    }
}
