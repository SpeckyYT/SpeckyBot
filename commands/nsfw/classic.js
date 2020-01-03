module.exports.run = async (bot, msg) => {
    require('./functions/img')("classic",msg);
}

module.exports.config = {
    name: "classic",
	description: "Gives you a classic endpoint!",
    usage: ``,
    category: `nsfw`,
	accessableby: "Members",
    aliases: []
}
