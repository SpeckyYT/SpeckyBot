module.exports.run = async (bot, msg, args, config) => {
    require('./functions/img')('kemonomimi', msg);
}

module.exports.config = {
    name: "kemonomimi",
	description: "Gives you a kemonomimi!",
    usage: ``,
    category: `sfw`,
	accessableby: "Members",
    aliases: ['kemo']
}
