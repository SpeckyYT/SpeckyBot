const Math = require('mathjs')

module.exports.run = async (bot, msg, args, config) => {
    let methods = ["yuri","eroYuri"]
    let method = methods[Math.floor(Math.random() * methods.length)];
    require('./functions/img')(method,msg);
}

module.exports.config = {
    name: "nekonsfw",
	description: "Gives you a yuri!",
    usage: ``,
    category: `nsfw`,
	accessableby: "Members",
    aliases: ["nsfwneko","lewdneko","nekolewd"]
}
