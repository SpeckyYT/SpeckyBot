const Math = require('mathjs')

module.exports.run = async (bot, msg, args, config) => {
    if(Math.randomInt(0,5))
        require('./functions/img')('neko', msg);
    else
        require('./functions/img')('nekoGif',msg);
}

module.exports.config = {
    name: "neko",
	description: "Gives you a neko!",
    usage: ``,
    category: `sfw`,
	accessableby: "Members",
    aliases: ["nya","nyan"]
}
