const fs = require('fs')
const chatbot = require('cleverbot-free')
const custom = require('./module/custom.js')

module.exports = async (bot, msg) => {
    if(!custom(bot, msg)) return;


    if(msg.channel.name != 'chatbot-testing-stuff-cool-wtf') return;
    if(!(msg.content === 'start')) return;
    await msg.channel.send('Learning session starting!')

    var response, first;
    var err = 0;

    await chatbot('what do you think about me').then(resp => response = resp).catch(c => {err = 1})

    if(err) return msg.channel.send('Error occurred!')

    /*file = reloadJson()

    file.push({
        input:[
            'hello how are you'
        ],
        output: [response]
    })

    writeJson(file)*/

    file = await reloadJson()
    while(!err){
        first = response;
        await chatbot(first).then(resp => response = resp).catch(c => {err = 1})

        if(!err){
            file.push({
                input:[first.toLowerCase().split(/[^a-z]/g).join(' ')],
                output: [response.toLowerCase().split(/[^a-z]/g).join(' ')]
            })
        }
        await writeJson(file)
        console.log(response)
    }

    if(err) return msg.channel.send('Error occurred!')
}

function reloadJson(){
    return JSON.parse(fs.readFileSync(`./events/custom/chatbot.json`))
}

function writeJson(file){
    fs.writeFileSync('./events/custom/chatbot.json', JSON.stringify(file,null,4))
}

module.exports.config = {
    event: "message"
}

