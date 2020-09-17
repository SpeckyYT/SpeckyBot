const { join } = require('path');
process.chdir(join(__dirname,'src'));
require(join(__dirname,'src','bot.js'))();
