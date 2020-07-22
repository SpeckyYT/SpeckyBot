const fs = require('fs');

module.exports = () => {
    require.extensions['.b'] = (module, filename) => {
        module.exports = fs.readFileSync(filename,{encoding: 'utf8'}).split('').filter((v) => '[]<>-+,.'.includes(v));
    }
    require.extensions['.bf'] = require.extensions['.b'];
}
