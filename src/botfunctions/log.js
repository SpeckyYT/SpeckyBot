const { appendFile, readFile, writeFile } = require('fs');
const { join } = require('path');

module.exports = (bot) => {
    bot.log = (content) => {
        if(content){
            console.log(String(content).error)
        }else{
            console.log()
        }

        return new Promise((res,rej) => {
            const log = join(process.cwd(),'..','commands.log');

            appendFile(log,`${content ?
                String(content)
                .replace(/[\x1b][[][0-9]{2}m/g,'')
                .replace(/\t/g,' ').replace(/ +/g,' ')
                : ''}\n`, err => err && rej(err));

            let file;

            readFile(log, (err,data)=>{
                if(err) rej(err);

                file = data.toString().split('\n');

                if(file.length > 100000){
                    while(file.length > 99000) file.shift();
                    writeFile(log,file.join("\n"), err => err ? rej(err) : res());
                }
            })
        })
    }
}
