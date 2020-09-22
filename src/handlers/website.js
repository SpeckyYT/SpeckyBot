const express = require('express');
const app = express();

const { readFile } = require('fs');
const { createServer } = require('net');
const { join } = require('path');

module.exports = async (bot) => {
    try{
        app.get('/log', async function (req, res) {
            readFile(join(process.cwd(),'..','commands.log'),(err,data) => {
                res.send(String(data).split("\n").reverse().join("<br>"));
            });
        });
        let port = 50000;
        function end(err){
            if(err){
                console.log(`Wasn't able to access any port`.error);
            }else{
                console.log(`${"Logged on port".warn} ${port.toString().black.bgYellow}`)
                app.listen(port,()=>{});
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
