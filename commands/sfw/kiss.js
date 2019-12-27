module.exports.run = async (bot, msg, args, config) => {
    require('./functions/img')('kiss', msg);
}

module.exports.config = {
    name: "kiss",
	description: "Gives you a kiss!",
    usage: ``,
    category: `sfw`,
	accessableby: "Members",
    aliases: []
}
