const { spawn } = require('child_process');
const { join } = require('path');

module.exports = async (bot,url) => {
    const matches = String(url).match(bot.regex.link);
    url = matches[0] ? matches[0] : url;
    bot.cache.console.drawlink = url;
    spawn('node',[join(__dirname,'child','drawB.js'),url],{stdio:[process.stdin,process.stdout,process.stderr]});
}
