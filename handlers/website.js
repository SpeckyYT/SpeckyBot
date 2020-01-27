const express = require('express')
const app = express()

const { readFile } = require('fs')

module.exports = async (bot) => {
    app.set('port', 3000)

    app.get('/log', function (req, res) {
        readFile('./commands.log',(err,data) => {
            res.send(data.toString().split("\n").reverse())
        })
    })

    app.listen(app.get('port'),()=>{})
}
