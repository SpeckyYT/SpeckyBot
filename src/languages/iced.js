const fs = require('fs');

module.exports = () => {
    require.extensions['.iced'] = (module, filename) => {
        module._compile(
            require('iced-coffee-script').compile(fs.readFileSync(filename,{encoding:"utf8"})),
            filename
        )
    }
}
