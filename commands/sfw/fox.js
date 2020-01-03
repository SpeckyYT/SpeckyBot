module.exports.run = async (bot, msg) => {
    require('./functions/img')('fox', msg);
}

module.exports.config = {
    name: "fox",
	description: "Gives you a fox!",
    usage: ``,
    category: `sfw`,
	accessableby: "Members",
    aliases: []
}
