const fs = require('fs');

module.exports = () => {
    require.extensions['.koffee'] = (module, filename) => {
        module._compile(
            require('koffee').compile(fs.readFileSync(filename,{encoding:"utf8"})),
            filename
        )
    }
}
