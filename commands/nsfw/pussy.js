module.exports = {
    name: "pussy",
	description: "Gives you a pussy!",
    usage: ``,
    category: `nsfw`,
	accessableby: "Members",
    aliases: []
}

const Math = require('mathjs')

module.exports.run = async (bot, msg) => {
    let methods = ["pussy","pussyWankGif","pussyArt","pussyGif"]
    let method = methods[Math.floor(Math.random() * methods.length)];
    require('./functions/img')(method,msg);
}
