module.exports = {
    name: "hentai",
	description: "Gives you a hentai!",
    usage: ``,
    category: `nsfw`,
	accessableby: "Members",
    aliases: []
}

const Math = require('mathjs')

module.exports.run = async (bot, msg) => {
    let methods = ["randomHentaiGif","hentai"]
    let method = methods[Math.floor(Math.random() * methods.length)];
    require('./functions/img')(method,msg);
}
