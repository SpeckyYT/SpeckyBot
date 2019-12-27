module.exports.run = async (bot, msg, args, config) => {
    require('./functions/img')('slap', msg);
}

module.exports.config = {
    name: "slap",
	description: "Gives you a slap!",
    usage: ``,
    category: `sfw`,
	accessableby: "Members",
    aliases: []
}
