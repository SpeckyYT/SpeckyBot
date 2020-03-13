const express = require('express')
const app = express()

const { readFile } = require('fs')

module.exports = async (bot) => {
    try{
        app.set('port', 50000);

        app.get('/log', function (req, res) {
            readFile('./commands.log',(err,data) => {
                res.send(data.toString().split("\n").reverse().join("<br>"));
            });
        });

        app.listen(app.get('port'),()=>{})
    }catch(err){}
}