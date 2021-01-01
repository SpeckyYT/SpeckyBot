const fs = require('fs');

module.exports = () => {
    require.extensions['.sbs'] = (module, filename) => {
        let script = fs.readFileSync(filename,{encoding:"utf8"});

        [
            [/\/\*/g,'{'],
            [/\*\//g,'}'],
            [/<=/g,'/*'],
            [/=>/g,'*/'],
            [/<>/g,'//'],
            [/->/g,'=>'],
            [/@exp/g,'module.exports'],
            [/@bm/g,'(bot,msg)=>'],
            [/@send/g,'msg.channel.send'],
            [/@error/g,'bot.cmdError'],
            [/@success/g,'bot.cmdSuccess'],
            [/§([a-zA-Z0-9]+)(.*)\r?\n/g,'$1:$2,'],
            [/@([a-zA-Z0-9]+)/g,'$1:'],
        ]
        .filter(a=>a)
        .map(([reg,rep]) => script = script.replace(reg,rep))

        try{
            module._compile(
                script,
                filename
            )
        }catch(e){
            console.error(script)
            throw e;
        }
    }
}
