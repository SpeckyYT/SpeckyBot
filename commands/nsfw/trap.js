module.exports = {
    name: "trap",
	description: "Gives you a trap!",
    usage: ``,
    category: `nsfw`,
	accessableby: "Members",
    aliases: []
}

module.exports.run = async (bot, msg) => {
    require('./functions/img')("trap",msg);
}
