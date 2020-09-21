module.exports = {
    name: "kemonomimi",
    description: "Gives you a kemonomimi!",
    category: "sfw",
    aliases: ['kemo','kemono','kemonomi'],
    flags: ["sfw"]
}

const { join } = require('path');

module.exports.run = async (bot, msg) => {
    if(require(join(__dirname,'functions','sfw'))(msg)){
        // SFW
        require(join(__dirname,'functions','img'))('kemonomimi', msg);
    }else{
        // NSFW
        require(join(process.cwd(),'commands','nsfw','functions','img'))(["kemonomimi","eroKemonomimi"], msg);
    }
}
