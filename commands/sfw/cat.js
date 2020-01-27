module.exports = {
    name: "cat",
	description: "Gives you a cat!",
    usage: ``,
    category: `sfw`,
	accessableby: "Members",
    aliases: []
}

module.exports.run = async (bot, msg) => {
    require('./functions/img')('cat', msg);
}
