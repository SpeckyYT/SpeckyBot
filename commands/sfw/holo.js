const Math = require('mathjs')

module.exports.run = async (bot, msg) => {
    if(!msg.channel.nsfw){
        //SFW
        require('./functions/img')('holo', msg)
    }else{
        //NSFW
        let methods = ["holo","holoEro"]
        let method = methods[Math.floor(Math.random() * methods.length)];
        require('../nsfw/functions/img')(method, msg);
    }
}

module.exports.config = {
    name: "holo",
	description: "Gives you a holo!",
    usage: ``,
    category: `sfw`,
	accessableby: "Members",
    aliases: ['kemo']
}
