module.exports.run = async (bot, msg, args, config) => {
    require('./functions/img')('cat', msg);
}

module.exports.config = {
    name: "cat",
	description: "Gives you a cat!",
    usage: ``,
    category: `sfw`,
	accessableby: "Members",
    aliases: []
}
