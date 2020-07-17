module.exports = {
    event: "message"
}

const { evaluate } = require('mathjs');
const leven = require('leven');

module.exports.call = (bot, msg) => {
    const u_settings = require('../../../db/u_settings.json');
    if(!msg.content) return;
    if(u_settings[msg.author.id] ? u_settings[msg.author.id].math : false){
        try{
            const res = String(evaluate(msg.content));
            if(leven(res, msg.content) > 2){
                msg.channel.send("```\n"+res+"\n```");
            }
        }catch(err){}
    }
}
