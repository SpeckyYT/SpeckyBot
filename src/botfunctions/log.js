const { promises: { appendFile }} = require('fs');
const { join } = require('path');

module.exports = (bot) => {
    bot.log = (cont) =>
        new Promise((res,rej) => {
            const content = cont ? String(cont) : '';
            console.log(content.error)
            const log = join(process.cwd(),'..','commands.log');

            appendFile(log,`${bot.regex ? content
            .replace(bot.regex.logColors,'')
            .replace(bot.regex.tabs,' ')
            .replace(bot.regex.spaces,' ') : content
            }\n`)
            .then(()=>res())
            .catch((err)=>rej(err))
        })
}
