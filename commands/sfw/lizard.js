module.exports = {
    name: "lizard",
	description: "Gives you a lizard!",
    usage: ``,
    category: `sfw`,
	accessableby: "Members",
    aliases: []
}

module.exports.run = async (bot, msg) => {
    require('./functions/img')('lizard', msg);
}
