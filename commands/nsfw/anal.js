module.exports = {
    name: "anal",
	description: "Gives you a anal porn!",
    usage: ``,
    category: `nsfw`,
	accessableby: "Members",
    aliases: ["ass"]
}

module.exports.run = async (bot, msg) => {
    require('./functions/img')("anal",msg);
}
