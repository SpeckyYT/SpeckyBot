module.exports = {
    name: "classic",
	description: "Gives you a classic endpoint!",
    usage: ``,
    category: `nsfw`,
	accessableby: "Members",
    aliases: []
}

module.exports.run = async (bot, msg) => {
    require('./functions/img')("classic",msg);
}
