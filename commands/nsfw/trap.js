module.exports.run = async (bot, msg, args, config) => {
    require('./functions/img')("trap",msg);
}

module.exports.config = {
    name: "trap",
	description: "Gives you a trap!",
    usage: ``,
    category: `nsfw`,
	accessableby: "Members",
    aliases: []
}
