const Math = require('mathjs')

module.exports.run = async (bot, msg) => {
    let methods = ["neko","nekoGif"]
    let method = methods[Math.floor(Math.random() * methods.length)];
    require('./functions/img')(method, msg);
}

module.exports.config = {
    name: "neko",
	description: "Gives you a neko!",
    usage: ``,
    category: `sfw`,
	accessableby: "Members",
    aliases: ["nya","nyan"]
}
