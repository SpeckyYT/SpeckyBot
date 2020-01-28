module.exports = {
    name: "yuri",
	description: "Gives you a yuri!",
    usage: ``,
    category: `nsfw`,
	accessableby: "Members",
    aliases: []
}

const Math = require('mathjs')

module.exports.run = async (bot, msg) => {
    let methods = ["yuri","eroYuri"]
    let method = methods[Math.floor(Math.random() * methods.length)];
    require('./functions/img')(method,msg);
}
