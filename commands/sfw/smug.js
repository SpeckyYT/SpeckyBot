module.exports.run = async (bot, msg, args, config) => {
    require('./functions/img')('smug', msg);
}

module.exports.config = {
    name: "smug",
	description: "Gives you a smug!",
    usage: ``,
    category: `sfw`,
	accessableby: "Members",
    aliases: []
}
