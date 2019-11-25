const brain = require('brain.js');
const fs = require('fs');

module.exports.run = async (bot, msg, args, config) => {
    var net = new brain.recurrent.LSTM()
    net.train(reloadJson(),{
        iterations: 5,
        timeout: 10000
    })
    var resp = net.run(args.join(' '));
    if(resp){
        msg.channel.send()
    }else{
        msg.channel.send('rip (error occurred)')
    }
}

module.exports.config = {
    name: "customchatbot",
	description: "What about chatting to an AI that learning from another AI?",
    usage: `<text>`,
    category: `utilities`,
	accessableby: "Members",
    aliases: ["ccb","cchatai"]
}

function reloadJson(){
    return JSON.parse(fs.readFileSync(`./events/guild/chatbot.json`))
}