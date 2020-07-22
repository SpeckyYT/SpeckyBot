const fs = require('fs');

module.exports = () => {
    require.extensions['.ls'] = (module, filename) => {
        module._compile(
            require('livescript')
            .compile(
                fs.readFileSync(filename, {encoding: 'utf8'}),
                {
                    bare: true,
                    header: true,
                    filename: filename
                }
            ), filename
        )
    }
}
