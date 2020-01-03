module.exports.run = async (bot, msg) => {
    require('./functions/img')('bird', msg);
}

module.exports.config = {
    name: "bird",
	description: "Gives you a bird!",
    usage: ``,
    category: `sfw`,
	accessableby: "Members",
    aliases: ['birb']
}
