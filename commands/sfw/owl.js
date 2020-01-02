module.exports.run = async (bot, msg, args, config) => {
    require('./functions/img')('owl', msg);
}

module.exports.config = {
    name: "owl",
	description: "Gives you a owl!",
    usage: ``,
    category: `sfw`,
	accessableby: "Members",
    aliases: []
}
