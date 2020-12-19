const { promises: { appendFile }} = require('fs');
const { join } = require('path');

module.exports = (bot) => {
    bot.log = (cont) =>
        new Promise((res,rej) => {
            const content = cont ? String(cont) : '';
            console.log(content.error)
            const log = join(process.cwd(),'..','commands.log');

            appendFile(log,`${content
            .replace(/[\x1b][[][0-9]{2}m/g,'')
            .replace(/\t/g,' ').replace(/ +/g,' ')
            }\n`)
            .then(()=>res())
            .catch((err)=>rej(err))
        })
}
