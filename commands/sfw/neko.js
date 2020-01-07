const Math = require('mathjs')

module.exports.run = async (bot, msg) => {
    if(!msg.channel.nsfw){
        //SFW
        let methods = ["neko","nekoGif"]
        let method = methods[Math.floor(Math.random() * methods.length)];
        require('./functions/img')(method, msg);
    }else{
        //NSFW
        let methods = ["neko","nekoGif","eroNeko"]
        let method = methods[Math.floor(Math.random() * methods.length)];
        require('../nsfw/functions/img')(method, msg);
    }
}

module.exports.config = {
    name: "neko",
	description: "Gives you a neko!",
    usage: ``,
    category: `sfw`,
	accessableby: "Members",
    aliases: ["nya","nyan"]
}
