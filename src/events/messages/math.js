module.exports = {
    event: "message"
}

const { evaluate } = require('mathjs');

module.exports.call = (bot, msg) => {
    const u_settings = require('../../../db/u_settings.json');
    if(!msg.content) return;
    if(u_settings[msg.author.id] ? u_settings[msg.author.id].math : false){
        try{
            const res = String(evaluate(msg.content));
            if(res.length < 50 && res != msg.content && res !== "undefined"){
                msg.channel.send("```js\n"+res+"\n```");
            }
        }catch(err){}
    }
}
