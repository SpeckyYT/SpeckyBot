const fs = require('fs');

module.exports = async () => {
    // More Array Methods    
    require('more-array-methods')();

    // CoffeeScript Support
    require('coffee-register');
    require.extensions['.coffeescript'] = require.extensions['.coffee'];

    // TypeScript Support DEPRECATED
    // is too slow

    // TXT Support (useless ://)
    require.extensions['.txt'] = (module, filename) => {
        module.exports = fs.readFileSync(filename,{encoding: 'utf8'});
    }

    // BrainFuck Support (useless ://)
    require.extensions['.b'] = (module, filename) => {
        module.exports = fs.readFileSync(filename,{encoding: 'utf8'}).split('').filter((v) => '[]<>-+,.'.includes(v));
    }
    require.extensions['.bf'] = require.extensions['.b'];

    // Colored Strings in Terminal
    require('colors').setTheme({
        silly: 'rainbow',
        input: 'grey',
        verbose: 'cyan',
        prompt: 'grey',
        info: 'green',
        data: 'blue',
        help: 'cyan',
        warn: 'yellow',
        debug: 'blue',
        error: 'red',
        cmd: 'magenta',
        success: 'green',
        startupinfo: 'grey',
        dms: 'grey',
        fail: 'red',
        failed: 'red',
        fatal: ['black','bgRed'],
        dependency: 'cyan',
        cli: 'cyan'
    });
}
