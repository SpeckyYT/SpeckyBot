const express = require('express');
const app = express();

const { createInterface } = require('readline');
const { createReadStream } = require('fs');
const { createServer } = require('net');
const { join } = require('path');

module.exports = (bot) => {
    if(global.website) global.website.close();

    try{
        app.get('/log', (req, res) => {
            const file = join(process.cwd(),'..','commands.log');
            const lines = [];
            const rl = createInterface(
                {
                    input: createReadStream(file),
                }
            );
            rl.on(
                'line',
                line => lines.push(line)
            );
            rl.on(
                'close',
                () => res.send(lines.reverse().slice(0,5000).join("<br>"))
            );
        });
        let port = 50000;
        function end(err){
            if(err){
                bot.log(`Wasn't able to access any port`.error);
            }else{
                bot.log(`${"Logged on port".warn} ${port.toString().black.bgYellow}`)
                const server = app.listen(port,()=>{});
                global.website = server;
            }
        }
        function check(fn){
            ((port,fn)=>{
                const tester = createServer()
                .once('error', function (err) {
                    if (err.code != 'EADDRINUSE') return fn(err);
                    fn(null, true)
                })
                .once('listening', function() {
                    tester.once('close', function() {
                        fn(null, false)
                    })
                    .close()
                })
                .listen(port);
            })(port, (err,taken) => {
                if(err || taken){
                    port++;
                    if(port < 2**16){
                        check(end);
                    }else{
                        return fn(true);
                    }
                }else{
                    return fn(false);
                }
            });
        }
        check(end);
    }catch(err){}
}
