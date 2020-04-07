const express = require('express');
const app = express();

const { readFile } = require('fs');
const { createServer } = require('net');

module.exports = async (bot) => {
    try{
        app.get('/log', async function (req, res) {
            readFile('./commands.log',(err,data) => {
                res.send(data.toString().split("\n").reverse().join("<br>"));
            });
        });
        let port = 50000;
        async function end(err){
            if(err){
                console.log(`Wasn't able to access any port`.error);
            }else{
                console.log(`${"Logged on port".warn} ${port.toString().black.bgYellow}`)
                app.listen(port,()=>{});
            }
        }
        async function check(fn){
            ((port,fn)=>{
                let tester = createServer()
                .once('error', async function (err) {
                    if (err.code != 'EADDRINUSE') return fn(err);
                    fn(null, true)
                })
                .once('listening', async function() {
                    tester.once('close', async function() { fn(null, false) })
                    .close()
                })
                .listen(port);
            })(port, async (err,taken) => {
                if(err || taken){
                    port++;
                    if(port < 2**16){
                        await check(end);
                    }else{
                        return fn(true);
                    }
                }else{
                    return fn(false);
                }
            });
        }
        await check(end);
    }catch(err){}
}
  