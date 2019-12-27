const Math = require('mathjs')

module.exports.run = async (bot, msg, args, config) => {
    let methods = ["girlSolo","girlSoloGif"]
    let method = methods[Math.floor(Math.random() * methods.length)];
    require('./functions/img')(method,msg);
}

module.exports.config = {
    name: "solo",
	description: "Gives you a solo girl!",
    usage: ``,
    category: `nsfw`,
	accessableby: "Members",
    aliases: ["sologirl"]
}
