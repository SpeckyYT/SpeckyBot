module.exports = {
    name: "kitsune",
	description: "Gives you a kitsune!",
    usage: ``,
    category: `nsfw`,
	accessableby: "Members",
    aliases: ["kitsu"]
}

const Math = require('mathjs')

module.exports.run = async (bot, msg) => {
    let methods = ["kitsune","eroKitsune"]
    let method = methods[Math.floor(Math.random() * methods.length)];
    require('./functions/img')(method,msg);
}
