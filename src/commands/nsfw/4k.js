module.exports = {
    name: "4k",
	description: "Gives you a 4k image!",
    usage: ``,
    category: `nsfw`,
	accessableby: "Members",
    aliases: []
}

module.exports.run = async (bot, msg) => {
    require('./functions/img')("4k",msg);
}
