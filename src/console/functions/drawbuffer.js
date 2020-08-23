const { spawn } = require('child_process');

module.exports = async (bot,url) => {
    const linkregex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)\.(png|jpg|jpeg|gif)/g
    const matches = String(url).match(linkregex);
    url = matches[0] ? matches[0] : url;
    bot.cache.console.drawlink = url;
    spawn('node',[`${__dirname}\\child\\drawB.js`,url],{stdio:[process.stdin,process.stdout,process.stderr]});
}
