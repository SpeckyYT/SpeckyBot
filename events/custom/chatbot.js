const fs = require('fs')
const chatbot = require('cleverbot-free')

//server limiter
const limited = ["538028973058424832","334362123293425676","592412978138054688"]

module.exports = async (bot, msg) => {
    if(msg.channel.type === "dm") return;

    //server limiter
    if(!limited.includes(msg.guild.id)) return;

    if(msg.channel.name != 'chatbot-testing-stuff-cool-wtf') return;
    if(!(msg.content === 'start')) return;
    await msg.channel.send('Learning session starting!')

    var response, first;
    let err = false;

    await chatbot('what do you think about me').then(resp => response = resp).catch(c => {err = true})

    if(err) return msg.channel.send('Error occurred!')

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

