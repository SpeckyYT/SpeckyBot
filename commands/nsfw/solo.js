module.exports = {
    name: "solo",
	description: "Gives you a solo girl!",
    usage: ``,
    category: `nsfw`,
	accessableby: "Members",
    aliases: ["sologirl","alone"]
}

const Math = require('mathjs')

module.exports.run = async (bot, msg) => {
    let methods = ["girlSolo","girlSoloGif"]
    let method = methods[Math.floor(Math.random() * methods.length)];
    require('./functions/img')(method,msg);
}
