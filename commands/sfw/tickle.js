module.exports.run = async (bot, msg) => {
    require('./functions/img')('tickle', msg);
}

module.exports.config = {
    name: "tickle",
	description: "Gives you a tickle!",
    usage: ``,
    category: `sfw`,
	accessableby: "Members",
    aliases: []
}
