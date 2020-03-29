module.exports = {
    name: "hug",
	description: "Gives you a hug!",
    usage: ``,
    category: `sfw`,
	accessableby: "Members",
    aliases: []
}

module.exports.run = async (bot, msg) => {
    require('./functions/img')('hug', msg);
}
