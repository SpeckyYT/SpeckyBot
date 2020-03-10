module.exports = {
    name: "lesbian",
	description: "Gives you a lesbian!",
    usage: ``,
    category: `nsfw`,
	accessableby: "Members",
    aliases: []
}

module.exports.run = async (bot, msg) => {
    require('./functions/img')('lesbian', msg);
}
