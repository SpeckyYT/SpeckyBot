console.log(require('fs').readdirSync(__dirname))
process.chdir(__dirname+'\\src');
require(__dirname+'\\src\\bot.js')();
