module.exports = {
    name: "feet",
	description: "Gives you feets!",
    usage: ``,
    category: `nsfw`,
	accessableby: "Members",
    aliases: ["foot"]
}

const Math = require('mathjs')

module.exports.run = async (bot, msg) => {
    let methods = ["feetGif","eroFeet","feet"]
    let method = methods[Math.floor(Math.random() * methods.length)];
    require('./functions/img')(method,msg);
}
