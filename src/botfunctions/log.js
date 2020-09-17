const { appendFile, readFile, writeFile } = require('fs');
const { join } = require('path');

module.exports = (bot) => {
    bot.log = async (content) => {
        const log = join(process.cwd(),'..','commands.log');

        appendFile(log,`${content ?
            String(content)
            .replace(/[\x1b][[][0-9]{2}m/g,'')
            .replace(/\t/g,' ').replace(/ +/g,' ')
            : ''}\n`,
        ()=>{});

        let file;

        readFile(log, async (err,data)=>{

            file = data.toString().split('\n');

            if(file.length > 100000){
                while(file.length > 99000){
                    file.shift();
                }
                writeFile(log,file.join("\n"),()=>{})
            }

        })

        if(content){
            console.log(String(content).error)
        }else{
            console.log()
        }
    }
}
