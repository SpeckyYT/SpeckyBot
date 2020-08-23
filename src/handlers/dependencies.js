const fs = require('fs');

module.exports = async () => {
    // More Array Methods
    require('more-array-methods')();

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

    // Require all languages
    console.log("\n\nLoading LANGUAGES!\n".info);
    fs.readdirSync(__dirname+'\\languages')
    .forEach(language => {
        try{
            require('.\\languages\\'+language)();
            console.log(language.data);
        }catch(err){
            console.log(`COULD NOT LOAD ${language.toUpperCase()} CORRECTLY`.error)
        }
    })
    console.log('\n')
}
