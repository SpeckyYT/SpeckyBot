module.exports = {
    name: "tickle",
	description: "Gives you a tickle!",
    usage: ``,
    category: `sfw`,
	accessableby: "Members",
    aliases: []
}

module.exports.run = async (bot, msg) => {
    require('./functions/img')('tickle', msg);
}
