module.exports.run = async (bot, msg) => {
    require('./functions/img')('lesbian', msg);
}

module.exports.config = {
    name: "lesbian",
	description: "Gives you a lesbian!",
    usage: ``,
    category: `nsfw`,
	accessableby: "Members",
    aliases: []
}
