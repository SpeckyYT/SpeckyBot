const Math = require('mathjs')

module.exports.run = async (bot, msg, args, config) => {
    let methods = ["cumsluts","cumArts"]
    let method = methods[Math.floor(Math.random() * methods.length)];
    require('./functions/img')(method,msg);
}

module.exports.config = {
    name: "cumsluts",
	description: "Gives you a cumslut!",
    usage: ``,
    category: `nsfw`,
	accessableby: "Members",
    aliases: ["cumslut","cs"]
}
