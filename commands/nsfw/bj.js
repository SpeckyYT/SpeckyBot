const Math = require('mathjs')

module.exports.run = async (bot, msg) => {
    let methods = ["bJ","blowJob"]
    let method = methods[Math.floor(Math.random() * methods.length)];
    require('./functions/img')(method,msg);
}

module.exports.config = {
    name: "blowjob",
	description: "Gives you a blow job!",
    usage: ``,
    category: `nsfw`,
	accessableby: "Members",
    aliases: ["bj"]
}
