module.exports = {
    event: "message"
}

const { evaluate } = require('mathjs');

module.exports.call = (bot, msg) => {
    const u_settings = require('../../../db/u_settings.json');

    if(u_settings[msg.author.id] ? u_settings[msg.author.id].math : false){
        try{
            const res = evaluate(msg.content);
            if(res != msg.content.trim()){
                msg.channel.send("```\n"+res+"\n```");
            }
        }catch(err){}
    }
}
