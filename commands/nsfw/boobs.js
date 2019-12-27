const Math = require('mathjs')

module.exports.run = async (bot, msg, args, config) => {
    let methods = ["tits","boobs"] //removed: smallBoobs
    let method = methods[Math.floor(Math.random() * methods.length)];
    require('./functions/img')(method,msg);
}

module.exports.config = {
    name: "boobs",
	description: "Gives you boobs!",
    usage: ``,
    category: `nsfw`,
	accessableby: "Members",
    aliases: ["boob","titts","tits","tit","titt"]
}
