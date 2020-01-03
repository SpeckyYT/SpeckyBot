module.exports.run = async (bot, msg) => {
    require('./functions/img')('lizard', msg);
}

module.exports.config = {
    name: "lizard",
	description: "Gives you a lizard!",
    usage: ``,
    category: `sfw`,
	accessableby: "Members",
    aliases: []
}
