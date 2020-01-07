const Math = require('mathjs')

module.exports.run = async (bot, msg) => {
    if(!msg.channel.nsfw){
        //SFW
        require('./functions/img')('kemonomimi', msg);
    }else{
        //NSFW
        let methods = ["kemonomimi","eroKemonomimi"]
        let method = methods[Math.floor(Math.random() * methods.length)];
        require('../nsfw/functions/img')(method, msg);
    }
}

module.exports.config = {
    name: "kemonomimi",
	description: "Gives you a kemonomimi!",
    usage: ``,
    category: `sfw`,
	accessableby: "Members",
    aliases: ['kemo','kemono','kemonomi']
}
